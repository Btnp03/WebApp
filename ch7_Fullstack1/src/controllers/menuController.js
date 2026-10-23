// backend/src/controllers/menuController.js
// อ้างอิงสไลด์หน้า 30-35: Controller จัดการ CRUD สำหรับ menu
const pool = require('../db/pool');

// 1. อ่านรายการเมนูทั้งหมด (GET /api/menu) - สไลด์หน้า 30
const getAllMenus = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.menuId, m.name, m.price, m.isBestSeller, m.typeId, t.name AS typeName
      FROM menu m
      LEFT JOIN type t ON m.typeId = t.typeId
      ORDER BY m.menuId ASC
    `);

    // แปลง isBestSeller เป็น Boolean เพื่อให้ตรงตามชนิดข้อมูล
    const formattedRows = rows.map((item) => ({
      ...item,
      price: Number(item.price),
      isBestSeller: Boolean(item.isBestSeller)
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error('Error fetching menus:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 2. อ่านเมนูตาม ID (GET /api/menu/:id) - สไลด์หน้า 31
const getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT m.menuId, m.name, m.price, m.isBestSeller, m.typeId, t.name AS typeName
      FROM menu m
      LEFT JOIN type t ON m.typeId = t.typeId
      WHERE m.menuId = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const item = rows[0];
    res.json({
      ...item,
      price: Number(item.price),
      isBestSeller: Boolean(item.isBestSeller)
    });
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 3. ค้นหาเมนู (GET /api/menu/search?keyword=...) - สไลด์หน้า 32
const searchMenus = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Please provide a search keyword' });
  }

  try {
    const searchTerm = `%${keyword}%`;
    const [rows] = await pool.query(`
      SELECT m.menuId, m.name, m.price, m.isBestSeller, m.typeId, t.name AS typeName
      FROM menu m
      LEFT JOIN type t ON m.typeId = t.typeId
      WHERE m.name LIKE ?
      ORDER BY m.menuId ASC
    `, [searchTerm]);

    const formattedRows = rows.map((item) => ({
      ...item,
      price: Number(item.price),
      isBestSeller: Boolean(item.isBestSeller)
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error('Error searching menus:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 4. เพิ่มเมนูใหม่ (POST /api/menu) - สไลด์หน้า 33
const createMenu = async (req, res) => {
  const { name, price, isBestSeller, typeId } = req.body;

  // ตรวจสอบข้อมูลนำเข้าที่จำเป็น
  if (!name || price === undefined || price === null || !typeId) {
    return res.status(400).json({
      error: 'Name, price, and typeId are required'
    });
  }

  try {
    // ตรวจสอบว่า typeId มีอยู่ในตาราง type หรือไม่ (Foreign Key Validation)
    const [types] = await pool.query('SELECT typeId FROM type WHERE typeId = ?', [typeId]);
    if (types.length === 0) {
      return res.status(400).json({ error: `Invalid typeId: Type with ID ${typeId} does not exist` });
    }

    const bestSellerVal = (isBestSeller === true || isBestSeller === 'true' || isBestSeller === 1) ? 1 : 0;
    const priceVal = Number(price);

    const [result] = await pool.query(
      'INSERT INTO menu (name, price, isBestSeller, typeId) VALUES (?, ?, ?, ?)',
      [name.trim(), priceVal, bestSellerVal, Number(typeId)]
    );

    res.status(201).json({
      menuId: result.insertId,
      name: name.trim(),
      price: priceVal,
      isBestSeller: Boolean(bestSellerVal),
      typeId: Number(typeId)
    });
  } catch (err) {
    console.error('Error creating menu:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 5. แก้ไขเมนู (PUT /api/menu/:id) - สไลด์หน้า 34
const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, price, isBestSeller, typeId } = req.body;

  if (!name || price === undefined || price === null || !typeId) {
    return res.status(400).json({
      error: 'Name, price, and typeId are required'
    });
  }

  try {
    // ตรวจสอบว่า typeId มีอยู่ในตาราง type หรือไม่
    const [types] = await pool.query('SELECT typeId FROM type WHERE typeId = ?', [typeId]);
    if (types.length === 0) {
      return res.status(400).json({ error: `Invalid typeId: Type with ID ${typeId} does not exist` });
    }

    const bestSellerVal = (isBestSeller === true || isBestSeller === 'true' || isBestSeller === 1) ? 1 : 0;
    const priceVal = Number(price);

    const [result] = await pool.query(
      'UPDATE menu SET name = ?, price = ?, isBestSeller = ?, typeId = ? WHERE menuId = ?',
      [name.trim(), priceVal, bestSellerVal, Number(typeId), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.json({
      menuId: Number(id),
      name: name.trim(),
      price: priceVal,
      isBestSeller: Boolean(bestSellerVal),
      typeId: Number(typeId)
    });
  } catch (err) {
    console.error('Error updating menu:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 6. ลบเมนู (DELETE /api/menu/:id) - สไลด์หน้า 35
const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM menu WHERE menuId = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.json({
      message: 'Menu deleted successfully',
      menuId: Number(id)
    });
  } catch (err) {
    console.error('Error deleting menu:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  searchMenus,
  createMenu,
  updateMenu,
  deleteMenu
};

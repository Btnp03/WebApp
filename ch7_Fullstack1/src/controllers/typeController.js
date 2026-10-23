// backend/src/controllers/typeController.js
// อ้างอิงสไลด์หน้า 30-35: Controller จัดการ CRUD ด้วย async/await, try/catch และ pool.query
const pool = require('../db/pool');

// 1. อ่านรายการประเภททั้งหมด (GET /api/type) - สไลด์หน้า 30
const getAllTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM type ORDER BY typeId ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching types:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 2. อ่านประเภทตาม ID (GET /api/type/:id) - สไลด์หน้า 31
const getTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM type WHERE typeId = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Type not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching type:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 3. เพิ่มประเภทใหม่ (POST /api/type) - สไลด์หน้า 33
const createType = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Type name is required' });
  }

  try {
    const [result] = await pool.query('INSERT INTO type (name) VALUES (?)', [name.trim()]);
    res.status(201).json({
      typeId: result.insertId,
      name: name.trim()
    });
  } catch (err) {
    console.error('Error creating type:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 4. แก้ไขประเภท (PUT /api/type/:id) - สไลด์หน้า 34
const updateType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Type name is required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE type SET name = ? WHERE typeId = ?',
      [name.trim(), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Type not found' });
    }

    res.json({
      typeId: Number(id),
      name: name.trim()
    });
  } catch (err) {
    console.error('Error updating type:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 5. ลบประเภท (DELETE /api/type/:id) - สไลด์หน้า 35
const deleteType = async (req, res) => {
  const { id } = req.params;
  try {
    // ตรวจสอบความสัมพันธ์ก่อนลบ: มี menu ที่ใช้ typeId นี้อยู่หรือไม่
    const [menus] = await pool.query('SELECT menuId FROM menu WHERE typeId = ?', [id]);
    if (menus.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete type: This type is currently referenced by existing menu items.'
      });
    }

    const [result] = await pool.query('DELETE FROM type WHERE typeId = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Type not found' });
    }

    res.json({
      message: 'Type deleted successfully',
      typeId: Number(id)
    });
  } catch (err) {
    console.error('Error deleting type:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType
};

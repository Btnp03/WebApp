// backend/src/routes/menuRoutes.js
// อ้างอิงสไลด์หน้า 36: การสร้าง Express Router และแมปไปยัง Controller
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Search Route (ต้องวางก่อน /:id ตามตัวอย่างในสไลด์หน้า 36)
router.get('/search', menuController.searchMenus);   // ค้นหาเมนูด้วย keyword (?keyword=...)

// Routes CRUD สำหรับ /api/menu
router.get('/', menuController.getAllMenus);         // อ่านเมนูทั้งหมด
router.get('/:id', menuController.getMenuById);       // อ่านเมนูตาม ID
router.post('/', menuController.createMenu);          // เพิ่มเมนูใหม่
router.put('/:id', menuController.updateMenu);        // แก้ไขเมนู
router.delete('/:id', menuController.deleteMenu);     // ลบเมนู

module.exports = router;

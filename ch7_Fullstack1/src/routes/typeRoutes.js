// backend/src/routes/typeRoutes.js
// อ้างอิงสไลด์หน้า 36: การสร้าง Express Router และแมปไปยัง Controller
const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

// Routes CRUD สำหรับ /api/type
router.get('/', typeController.getAllTypes);        // อ่านประเภททั้งหมด
router.get('/:id', typeController.getTypeById);      // อ่านประเภทตาม ID
router.post('/', typeController.createType);         // เพิ่มประเภทใหม่
router.put('/:id', typeController.updateType);       // แก้ไขประเภท
router.delete('/:id', typeController.deleteType);    // ลบประเภท

module.exports = router;

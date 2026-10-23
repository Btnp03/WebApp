// backend/routes/users.js
// สำหรับ Admin Mode: จัดการผู้ใช้และเปลี่ยน Role (Change User Role)
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prisma');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// 1. GET /users (Admin Only: ดูรายชื่อผู้ใช้ทั้งหมด)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { userId: 'asc' }
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ message: 'Error fetching users' });
  }
});

// 2. PATCH /users/:id/role (Admin Only: เปลี่ยน Role ของผู้ใช้)
router.patch('/:id/role', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role || (role !== 'USER' && role !== 'ADMIN')) {
    return res.status(400).json({ message: 'Role must be either USER or ADMIN' });
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: { userId: Number(id) }
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { userId: Number(id) },
      data: { role: role },
      select: {
        userId: true,
        userName: true,
        email: true,
        role: true
      }
    });

    return res.status(200).json({
      message: `User role updated to ${role} successfully`,
      user: updatedUser
    });
  } catch (err) {
    console.error('Error updating user role:', err);
    return res.status(500).json({ message: 'Error updating user role' });
  }
});

module.exports = router;

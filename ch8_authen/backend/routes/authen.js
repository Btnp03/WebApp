// backend/routes/authen.js
// อ้างอิงสไลด์หน้า 26, 27, 30, 35, 37
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prisma');
const verifyToken = require('../middleware/verifyToken');

// 1. POST /authen/register (สไลด์หน้า 27)
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // ตรวจสอบ username หรือ email ซ้ำตามสไลด์หน้า 27
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { userName: userName.trim() },
          { email: email.trim() }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Duplicate Username or Email' });
    }

    // Hash Password ด้วย bcrypt ตามสไลด์หน้า 27
    const hashPassword = await bcrypt.hash(password, 10);

    // กำหนดให้บัญชีแรกสุดหรือ admin มีสิทธิ์ ADMIN นอกนั้นเป็น USER เริ่มต้น
    const userCount = await prisma.user.count();
    const assignedRole = userCount === 0 || userName.toLowerCase() === 'admin' ? 'ADMIN' : 'USER';

    await prisma.user.create({
      data: {
        userName: userName.trim(),
        email: email.trim(),
        password: hashPassword,
        role: assignedRole
      }
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in /register:', err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// 2. POST /authen/login (สไลด์หน้า 30, 35)
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: { userName: userName.trim() }
    });

    if (!getUser) {
      return res.status(404).json({ message: 'Unknown Username' });
    }

    const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: 'Password Incorrect' });
    }

    // สร้าง JWT Token ตามสไลด์หน้า 35
    const token = jwt.sign(
      { userId: getUser.userId, role: getUser.role },
      process.env.JWT_KEY || 'jwt-secret-key',
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Login Success',
      token: token,
      user: {
        userId: getUser.userId,
        userName: getUser.userName,
        role: getUser.role
      }
    });
  } catch (err) {
    console.error('Error in /login:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

// 3. GET /authen/home (สไลด์หน้า 37)
router.get('/home', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const getUser = await prisma.user.findMany({
      where: { userId: Number(userId) },
      select: {
        userId: true,
        userName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (getUser.length === 0) {
      return res.status(404).json({ message: 'User not exist' });
    }

    return res.status(200).json({ user: getUser });
  } catch (err) {
    console.error('Error in /authen/home:', err);
    return res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;

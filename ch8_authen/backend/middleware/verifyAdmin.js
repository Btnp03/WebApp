// backend/middleware/verifyAdmin.js
// Middleware ตรวจสอบสิทธิ์ Admin (Authorization)
const prisma = require('../prisma/prisma');

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: Number(req.userId) },
      select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }

    next();
  } catch (err) {
    console.error('Error verifying admin:', err);
    return res.status(500).json({ message: 'Server error verifying admin rights' });
  }
};

module.exports = verifyAdmin;

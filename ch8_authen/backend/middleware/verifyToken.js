// backend/middleware/verifyToken.js
// อ้างอิงสไลด์หน้า 36: Middleware ตรวจสอบ JSON Web Token
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: 'no token provide' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = parts[1];
    if (!token || token === 'null' || token === 'undefined') {
      return res.status(403).json({ message: 'no token provide' });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY || 'jwt-secret-key');
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;

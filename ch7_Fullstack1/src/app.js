// backend/src/app.js
// อ้างอิงสไลด์หน้า 37: Express App Configuration & Middleware & Route Mounting
const express = require('express');
const cors = require('cors');
const typeRoutes = require('./routes/typeRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();

// Middleware ตามสไลด์หน้า 37 และ 40
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Mounting สำหรับ Menu และ Type ตามสไลด์หน้า 37 และโจทย์หน้า 59
app.use('/api/type', typeRoutes);
app.use('/api/menu', menuRoutes);

// Root endpoint สำหรับตรวจสถานะ Server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middleware จัดการกรณี Client ส่ง JSON ผิดรูปแบบ (Invalid JSON)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

module.exports = app;

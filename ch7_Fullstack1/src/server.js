// backend/src/server.js
// อ้างอิงสไลด์หน้า 38: Entry point ของ Server สำหรับ Listen บน PORT ที่กำหนด
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// backend/src/server.js
// อ้างอิงสไลด์หน้า 38, 49
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});

// backend/prisma/prisma.js
// อ้างอิงสไลด์หน้า 26, 30: การสร้างและ Export Prisma Client instance
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;

// backend/prisma/seed.js
const prisma = require('./prisma');
const bcrypt = require('bcrypt');

async function main() {
  const hashPassword = await bcrypt.hash('123456', 10);

  // 1. สร้าง Admin เริ่มต้น
  const admin = await prisma.user.upsert({
    where: { userName: 'admin' },
    update: {},
    create: {
      userName: 'admin',
      email: 'admin@shop.com',
      password: hashPassword,
      role: 'ADMIN'
    }
  });

  // 2. สร้าง Normal User เริ่มต้น
  const user = await prisma.user.upsert({
    where: { userName: 'somchai' },
    update: {},
    create: {
      userName: 'somchai',
      email: 'somchai@shop.com',
      password: hashPassword,
      role: 'USER'
    }
  });

  // 3. สร้าง Products เริ่มต้นตามสไลด์
  const initialProducts = [
    { productName: 'cake', price: 35.0, isBestSeller: true },
    { productName: 'bread', price: 25.0, isBestSeller: false },
    { productName: 'milk', price: 15.0, isBestSeller: true },
    { productName: 'donut', price: 45.0, isBestSeller: false },
    { productName: 'cookie', price: 55.0, isBestSeller: true }
  ];

  for (const item of initialProducts) {
    const exists = await prisma.product.findFirst({
      where: { productName: item.productName }
    });
    if (!exists) {
      await prisma.product.create({ data: item });
    }
  }

  console.log('Seeded database with initial users and products successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

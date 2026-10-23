// backend/routes/products.js
// จัดการรายการสินค้า (Menu) สำหรับ Guest, User และ Admin
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prisma');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// 1. GET /products (Guest, User, Admin สามารถดูได้)
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ratings: {
          select: {
            starRating: true,
            userId: true
          }
        }
      },
      orderBy: { productId: 'asc' }
    });

    // คำนวณค่าเฉลี่ยคะแนน Rating และจำนวนผู้รีวิว
    const formatted = products.map((p) => {
      const totalRatings = p.ratings.length;
      const avgRating =
        totalRatings > 0
          ? Number(
              (
                p.ratings.reduce((sum, r) => sum + r.starRating, 0) /
                totalRatings
              ).toFixed(1)
            )
          : 0;

      return {
        productId: p.productId,
        productName: p.productName,
        price: p.price,
        isBestSeller: p.isBestSeller,
        avgRating: avgRating,
        totalReviews: totalRatings,
        ratings: p.ratings
      };
    });

    return res.status(200).json(formatted);
  } catch (err) {
    console.error('Error in GET /products:', err);
    return res.status(500).json({ message: 'Error fetching products' });
  }
});

// 2. POST /products (Admin Mode: เพิ่มสินค้าใหม่ โดยมีการป้องกันสิทธิ์ด้วย verifyToken & verifyAdmin)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const { productName, price, isBestSeller } = req.body;

  if (!productName || price === undefined || price === null) {
    return res.status(400).json({ message: 'Product name and price are required' });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        productName: productName.trim(),
        price: parseFloat(price),
        isBestSeller: Boolean(isBestSeller)
      }
    });

    return res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (err) {
    console.error('Error in POST /products:', err);
    return res.status(500).json({ message: 'Error creating product' });
  }
});

module.exports = router;

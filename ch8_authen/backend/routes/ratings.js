// backend/routes/ratings.js
// สำหรับ User Mode: ให้คะแนนสินค้า (Rating) และบันทึกลงฐานข้อมูล
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prisma');
const verifyToken = require('../middleware/verifyToken');

// POST /ratings (ต้อง Login: ใช้ verifyToken)
router.post('/', verifyToken, async (req, res) => {
  const { productId, starRating } = req.body;
  const userId = req.userId;

  if (!productId || starRating === undefined) {
    return res.status(400).json({ message: 'productId and starRating are required' });
  }

  const ratingVal = parseInt(starRating);
  if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
    return res.status(400).json({ message: 'Rating must be an integer between 1 and 5' });
  }

  try {
    // ตรวจสอบว่าสินค้ามีอยู่จริงหรือไม่
    const product = await prisma.product.findUnique({
      where: { productId: Number(productId) }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // บันทึกหรืออัปเดต Rating ของผู้ใช้ต่อสินค้านี้
    const rating = await prisma.rating.upsert({
      where: {
        userId_productId: {
          userId: Number(userId),
          productId: Number(productId)
        }
      },
      update: {
        starRating: ratingVal
      },
      create: {
        userId: Number(userId),
        productId: Number(productId),
        starRating: ratingVal
      }
    });

    return res.status(200).json({
      message: 'Rating submitted successfully',
      rating
    });
  } catch (err) {
    console.error('Error submitting rating:', err);
    return res.status(500).json({ message: 'Error saving rating' });
  }
});

module.exports = router;

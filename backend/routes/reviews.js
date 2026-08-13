const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET reviews for a product
router.get('/:productSlug', async (req, res) => {
  try {
    const { productSlug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || 'newest';

    let sortQuery = { createdAt: -1 }; // default newest
    if (sort === 'oldest') sortQuery = { createdAt: 1 };
    if (sort === 'highest') sortQuery = { rating: -1, createdAt: -1 };
    if (sort === 'lowest') sortQuery = { rating: 1, createdAt: -1 };

    const total = await Review.countDocuments({ productSlug });
    const reviews = await Review.find({ productSlug })
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-email'); // Don't expose emails

    // Calculate stats
    const allReviews = await Review.find({ productSlug }).select('rating');
    const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allReviews.forEach(r => { stats[r.rating]++; });
    const avgRating = total > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(2)
      : 0;

    res.json({
      reviews,
      stats: {
        total,
        average: parseFloat(avgRating),
        distribution: stats
      },
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// POST a new review
router.post('/:productSlug', async (req, res) => {
  try {
    const { productSlug } = req.params;
    const { name, email, rating, title, text } = req.body;

    if (!name || !email || !rating || !text) {
      return res.status(400).json({ message: 'Name, email, rating, and review text are required' });
    }

    const review = new Review({
      productSlug,
      name,
      email,
      rating: parseInt(rating),
      title: title || '',
      text
    });

    await review.save();

    // Return without email
    const saved = review.toObject();
    delete saved.email;

    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

module.exports = router;

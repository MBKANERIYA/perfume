const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  discount: {
    type: String,
  },
  rating: {
    type: String,
    default: '0.0',
  },
  reviews: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  image: {
    type: String,
    required: true,
  },
  categories: [{
    type: String,
  }],
  tagline: {
    type: String,
  },
  fullNotes: {
    top: String,
    heart: String,
    base: String,
  },
  bottleCategory: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);

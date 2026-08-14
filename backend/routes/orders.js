const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMethod, paymentId } = req.body;

    // Generate a simple unique order ID (e.g., #1005)
    // Find the latest order to increment the ID
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    let nextOrderNum = 1000;
    if (lastOrder && lastOrder.orderId) {
      const lastNum = parseInt(lastOrder.orderId.replace('#', ''), 10);
      if (!isNaN(lastNum)) {
        nextOrderNum = lastNum + 1;
      }
    }
    const orderId = `#${nextOrderNum}`;

    const newOrder = new Order({
      orderId,
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'Razorpay' ? 'Paid' : 'Pending',
      razorpayPaymentId: paymentId || null,
      orderStatus: 'Processing'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/orders/my-orders
// @desc    Get all orders for a specific user by email
router.get('/my-orders', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }
    const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const Order = require('../models/Orders');
const response = require('../response');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { tableNumber, cart, status } = req.body;
    const newOrder = new Order({
      tableNumber,
      cart,
      status,
    });
    await newOrder.save();
    response(201, newOrder, 'Success post order', res);
  } catch (error) {
    response(500, 'Invalid', 'Internal server error', res);
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    response(200, orders, 'Success get orders', res);
  } catch (error) {
    response(500, 'Invalid', 'Internal server error', res);
  }
});

module.exports = router;

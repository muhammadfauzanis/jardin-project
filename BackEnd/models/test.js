const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Sesuaikan dengan path file model Cart Anda
const Product = require('../models/Product'); // Sesuaikan dengan path file model Product Anda

// Create Cart Item
router.post('/carts', async (req, res) => {
  try {
    const { productId, quantity, option } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newCartItem = new Cart({
      productId,
      quantity,
      option,
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get All Cart Items
router.get('/carts', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Single Cart Item
router.get('/carts/:cartItemId', async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.cartItemId).populate(
      'productId'
    );
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Cart Item
router.put('/carts/:cartItemId', async (req, res) => {
  try {
    const { quantity, option } = req.body;
    const updatedCartItem = await Cart.findByIdAndUpdate(
      req.params.cartItemId,
      { quantity, option },
      { new: true }
    ).populate('productId');
    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json(updatedCartItem);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Cart Item
router.delete('/carts/:cartItemId', async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

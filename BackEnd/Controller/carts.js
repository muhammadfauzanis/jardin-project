const express = require('express');
const Cart = require('../models/Carts');
const response = require('../response');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity, totalPrice, option } = req.body;

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, items: [], totalPrice: 0, option });
    }

    const existingItemIndex = userCart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      userCart.items[existingItemIndex].quantity += quantity;
    } else {
      userCart.items.push({
        productId,
        quantity,
        option,
      });
    }

    userCart.totalPrice += totalPrice;

    await userCart.save();

    response(201, userCart, 'Success add to cart', res);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartUser = await Cart.findOne({ userId }).populate('items.productId');

    if (!cartUser) {
      return response(404, 'Invalid', 'Cart not found', res);
    }

    response(201, cartUser, 'Success show carts', res);
  } catch (err) {
    response(500, 'Invalid', 'Internal server error', res);
  }
});

router.put('/:cartId/:productId', async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity, totalPrice } = req.body;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return response(404, 'Invalid', 'Cart not found', res);
    }

    const cartItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (!cartItem) {
      return response(404, 'Invalid', 'Product not found!', res);
    }

    cartItem.quantity = quantity;
    cart.totalPrice = totalPrice;
    await cart.save();

    response(200, cart, 'Success updated cart', res);
  } catch (error) {
    return response(500, 'Invalid', 'Internal server error', res);
  }
});

router.delete('/:cartId/:productId', async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return response(404, 'Invalid', 'Cart not found', res);
    }

    const cartItemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (cartItemIndex === -1) {
      return response(404, 'Invalid', 'Product not found!', res);
    }

    cart.items.splice(cartItemIndex, 1);

    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cartId);
      return response(200, null, 'Success delete cart', res);
    }

    await cart.save();

    response(200, cart, 'Success delete product', res);
  } catch (error) {
    return response(500, 'Invalid', 'Internal server error', res);
  }
});

module.exports = router;

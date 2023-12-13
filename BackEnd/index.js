const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const Products = require('./models/Products');
const Category = require('./models/Category');
const response = require('./response');

dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['https://jardin-resto-app.vercel.app', 'http://localhost:5173'],
  })
);

app.get('/', (req, res) => {
  res.send('Halo server jalan');
});

app.get('/category', async (req, res) => {
  try {
    const categorys = await Category.find();

    res.status(200).json({
      categorys: categorys,
      message: 'Success get product',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { category, productName, price, description, image, option, note } =
      req.body;

    let categoryPost = await Category.findOne({ name: category });

    if (!categoryPost) {
      categoryPost = await Category.create({
        name: category,
      });
    }

    const productPost = await Products.create({
      productName,
      price,
      description,
      image,
      category: categoryPost._id,
      option,
      note,
    });

    response(200, productPost, 'Success add data product', res);
  } catch (err) {
    response(500, 'invalid', 'error', res);
    console.log(err.message);
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Products.find().populate('category');
    response(200, products, 'Success get product data', res);
    // res.status(200).json({
    //   products: products,
    //   message: 'Success get product',
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);

    if (!product) {
      response(404, 'Invalid', 'Cannot get product', res);
    }

    response(200, product, 'Success get product by Id', res);
  } catch (err) {
    response(500, 'Invalid', 'Server Error', res);
  }
});

// CARTS
const Cart = require('./models/Carts');
app.post('/carts', async (req, res) => {
  try {
    const { userId, productId, quantity, totalPrice, option } = req.body;

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, items: [], totalPrice: 0 });
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

app.get('/carts/:userId', async (req, res) => {
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

app.put('/carts/:cartId/:productId', async (req, res) => {
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

app.delete('/carts/:cartId/:productId', async (req, res) => {
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

// Order
const Order = require('./models/Orders');
app.post('/orders', async (req, res) => {
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

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    response(200, orders, 'Success get orders', res);
  } catch (error) {
    response(500, 'Invalid', 'Internal server error', res);
  }
});

app.listen(PORT, () => {
  console.log(`App run at http://localhost:${PORT}`);
});

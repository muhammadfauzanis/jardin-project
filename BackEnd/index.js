const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');

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

// Handle products
const productController = require('./Controller/product');
app.use('/products', productController);

// Handle category
const categoryController = require('./Controller/category');
app.use('/category', categoryController);

// CARTS
const cartController = require('./Controller/carts');
app.use('/carts', cartController);

// Order
const orderController = require('./Controller/order');
app.use('/orders', orderController);

app.listen(PORT, () => {
  console.log(`App run at http://localhost:${PORT}`);
});

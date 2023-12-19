const express = require('express');
const Products = require('../models/Products');
const Category = require('../models/Category');
const response = require('../response');

const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.get('/:productId', async (req, res) => {
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

module.exports = router;

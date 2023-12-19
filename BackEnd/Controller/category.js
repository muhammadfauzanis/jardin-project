const express = require('express');
const Category = require('../models/Category');
const response = require('../response');

const router = express.Router();

router.get('/', async (req, res) => {
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

module.exports = router;

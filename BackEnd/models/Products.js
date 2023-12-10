const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  productName: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
  option: {
    type: [String],
    default: [''],
  },
  note: {
    type: String,
    default: '',
  },
});

const ProductModal = mongoose.model('Product', productSchema);

module.exports = ProductModal;

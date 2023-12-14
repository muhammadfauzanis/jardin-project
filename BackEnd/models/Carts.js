const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },

      option: {
        type: String,
        default: '',
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

const CartModal = mongoose.model('Cart', cartSchema);

module.exports = CartModal;

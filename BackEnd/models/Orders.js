const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
});

const OrderModal = mongoose.model('Order', orderSchema);

module.exports = OrderModal;

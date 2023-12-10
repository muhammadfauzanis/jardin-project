const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

const CategoryModal = mongoose.model('Category', categorySchema);

module.exports = CategoryModal;

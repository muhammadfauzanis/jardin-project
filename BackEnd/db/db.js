const mongoose = require('mongoose');

const db = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;

const mongoose = require('mongoose');
const { MONGO_URI } = require('./envconfig');

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[INFO] MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectMongo;
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
const connectDB = (url) => {
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;

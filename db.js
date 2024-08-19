const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
  console.error("MongoDB server connection error", err); // Include the error message
});

db.on('disconnected', () => {
  console.log("Disconnected from MongoDB server");
});

module.exports = db;

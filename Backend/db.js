
const mongoose = require('mongoose');

 const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vishvajitjamdade25:vishvajit123@smart-note-app.vjpuxn9.mongodb.net/?retryWrites=true&w=majority&appName=smart-note-app', {
      
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;
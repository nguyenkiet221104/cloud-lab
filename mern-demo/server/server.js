const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route kiểm tra
app.get('/', (req, res) => {
  res.send('MERN Backend is running on Render!');
});

// API Route cho Lab 4
app.get('/api/students', (req, res) => {
  res.json([
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' }
  ]);
});

// Cổng động từ Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

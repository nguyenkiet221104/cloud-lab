const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
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
const axios = require('axios');
const cheerio = require('cheerio');
app.get('/api/render-link', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Vui lòng cung cấp tham số url' });
  }

  try {
    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || '';

    res.json({
      success: true,
      data: { title, description, image }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
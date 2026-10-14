const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API đang hoạt động! Hãy truy cập /api/render-link?url=https://github.com');
});
app.get('/api/render-link', async (req, res) => {
    try {
        const targetUrl = req.query.url;
        if (!targetUrl) return res.status(400).json({ error: 'Thiếu tham số url' });
        const r = await axios.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(r.data);
        res.json({
            success: true,
            data: {
                title: $('meta[property="og:title"]').attr('content') || $('title').text() || '',
                description: $('meta[property="og:description"]').attr('content') || '',
                image: $('meta[property="og:image"]').attr('content') || ''
            }
        });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});
app.listen(PORT, '0.0.0.0', () => console.log('Server đang chạy tại http://localhost:' + PORT));

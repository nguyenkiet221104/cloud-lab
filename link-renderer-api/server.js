const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/api/render-link', async (req, res) => {
    try {
        const r = await axios.get(req.query.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(r.data);
        res.json({
            success: true,
            data: {
                title: $('meta[property="og:title"]').attr('content') || $('title').text(),
                description: $('meta[property="og:description"]').attr('content') || '',
                image: $('meta[property="og:image"]').attr('content') || ''
            }
        });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});
app.listen(PORT, () => console.log('Server đang chạy tại http://localhost:' + PORT));

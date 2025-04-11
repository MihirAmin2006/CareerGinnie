const express = require('express');
const router = express.Router();
const axios = require('axios');

// JSearch API Integration
router.get('/search', async (req, res) => {
    try {
        const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': process.env.RAPID_API_HOST
            },
            params: req.query
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
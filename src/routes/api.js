const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const authService = require('../services/authService');
const userService = require('../services/userService');

// Auth routes
router.post('/auth/signup', async (req, res) => {
    try {
        const { email, password, ...userData } = req.body;
        const user = await authService.signUp(email, password, userData);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.signIn(email, password);
        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// User routes
router.get('/user/:userId', async (req, res) => {
    try {
        const profile = await userService.getUserProfile(req.params.userId);
        res.json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/user/:userId', async (req, res) => {
    try {
        await userService.updateUserProfile(req.params.userId, req.body);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// LLAMA API proxy endpoint
router.post('/llama-proxy', async (req, res) => {
    try {
        const { systemPrompt, userPrompt, apiKey } = req.body;
        
        if (!systemPrompt || !userPrompt || !apiKey) {
            return res.status(400).json({ 
                error: 'Missing required parameters' 
            });
        }
        
        // Call the NVIDIA API
        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "nvidia/llama-3.3-nemotron-super-49b-v1",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],
                temperature: 0.6,
                top_p: 0.95,
                max_tokens: 4096,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false
            })
        });
        
        const data = await response.json();
        
        // Check if the API returned an error
        if (data.error) {
            return res.status(500).json({ 
                error: `NVIDIA API Error: ${data.error.message || JSON.stringify(data.error)}` 
            });
        }
        
        // Check if the response has the expected structure
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
            return res.status(500).json({ 
                error: 'Unexpected API response format', 
                data 
            });
        }
        
        // Return the content
        res.json({ 
            content: data.choices[0].message.content 
        });
    } catch (error) {
        console.error('Proxy server error:', error);
        res.status(500).json({ 
            error: `Server error: ${error.message}` 
        });
    }
});

module.exports = router;
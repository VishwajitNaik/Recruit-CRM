// src/controllers.js in Public API Microservice
const axios = require('axios');

const MAIN_SERVICE_URL = 'http://localhost:3000/api';

async function getProfile(req, res) {
    const apiKey = req.headers['x-api-key'];
    const user = await validateApiKey(apiKey);

    if (!user) {
        return res.status(401).send('Invalid API key');
    }

    res.json({
        id: user.user_id,
        first_name: 'John', // Mock data; replace with actual user data if needed
        last_name: 'Doe',
        email: 'john.doe@example.com'
    });
}

async function getCandidates(req, res) {
    const apiKey = req.headers['x-api-key'];
    const user = await validateApiKey(apiKey);

    if (!user) {
        return res.status(401).send('Invalid API key');
    }

    try {
        const response = await axios.get(`${MAIN_SERVICE_URL}/candidate`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching candidates');
    }
}

async function validateApiKey(apiKey) {
    try {
        const response = await axios.post(`${MAIN_SERVICE_URL}/validate-api-key`, { apiKey });
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports = { getProfile, getCandidates };

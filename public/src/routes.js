const express = require('express');
const { getProfile, getCandidates } = require('./controllers');
const router = express.Router();

router.post('/public/profile', getProfile);
router.get('/public/candidate', getCandidates);

module.exports = router;

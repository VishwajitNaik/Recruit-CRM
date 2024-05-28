const express = require('express');
const { register, login, authenticateJWT, addCandidate, getCandidates } = require('./controllers');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/protected', authenticateJWT, (req, res) => res.send('Protected data'));
router.post('/candidate', authenticateJWT, addCandidate);
router.get('/candidate', authenticateJWT, getCandidates);

module.exports = router;

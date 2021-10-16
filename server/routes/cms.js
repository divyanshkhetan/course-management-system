const express = require('express');

const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');

// Controllers
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const welcome = require('../controllers/welcome');
const profileInfo = require('../controllers/profileInfo');

// Routes
router.post('/api/signup', signup);
router.post('/api/login', login);
router.post('/welcome', auth, welcome);
router.post('/tokenCheck', auth, (req, res) => {
    res.send('valid');
});
router.post('/api/profileInfo', auth, profileInfo);

module.exports = router;
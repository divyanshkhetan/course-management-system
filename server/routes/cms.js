const express = require('express');

const router = express.Router();

const signup = require('../controllers/signup');
const login = require('../controllers/login');

router.post('/api/signup', signup);
router.post('/api/login', login);

module.exports = router;
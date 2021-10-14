const express = require('express');

const router = express.Router();

const cmsController = require('../controllers/cms');

router.get('/', cmsController.cmsHomePage);
router.post('/api/signup', cmsController.signup);

module.exports = router;
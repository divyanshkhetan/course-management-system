const express = require('express');

const router = express.Router();

const cmsController = require('../controllers/cms');

router.get('/', cmsController.cmsHomePage);

module.exports = router;
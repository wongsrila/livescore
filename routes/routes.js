const express = require('express');
const livescoreController = require('../controllers/livescoreController');
const fixtureController = require('../controllers/fixtureController');

const router = express.Router();

router.get('/', livescoreController.getIndex);
router.get('/fixture/:id', fixtureController.getFixture);

module.exports = router;

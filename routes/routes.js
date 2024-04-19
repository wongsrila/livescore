const express = require('express');
const livescoreController = require('../controllers/livescoreController');

const router = express.Router();

router.get('/', livescoreController.getIndex);

module.exports = router;

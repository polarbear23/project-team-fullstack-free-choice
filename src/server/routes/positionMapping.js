const express = require('express');
const { positionMapping } = require('../controllers/positionMapping');

const router = express.Router();

router.post('/positionMapping', positionMapping);

module.exports = router;

const express = require('express');
const {
    round
} = require('../controllers/round');

const router = express.Router();

router.post("/round", round);

module.exports = router;
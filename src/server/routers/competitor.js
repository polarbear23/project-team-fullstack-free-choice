const express = require('express');
const {
    competitor
} = requirre('../controllers/competitor');

const router = express.Router();

router.post('/competitor', competitor);

module.exports = router;
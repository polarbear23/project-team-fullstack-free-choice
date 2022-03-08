const express = require('express');
const {
    competition
} = requirre('../controllers/competition');

const router = express.Router();

router.post('/competition', competition);

module.exports = router;
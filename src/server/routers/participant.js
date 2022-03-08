const express = require('express');
const {
    participant
} = require('../controllers/participant');

const router = express.Router();

router.post('/participants', participant);

module.exports = router;
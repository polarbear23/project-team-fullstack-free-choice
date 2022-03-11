const express = require('express');

const { createAdmin, authenticateAdmin } = require('../controllers/admin');

const router = express.Router();

router.post('/register', createAdmin);
router.post('/login', authenticateAdmin);

module.exports = router;

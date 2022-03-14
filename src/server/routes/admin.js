const express = require('express');
const passport = require('passport')

const { createAdmin, authenticateAdmin, getAdminFromJWT } = require('../controllers/admin');

require('../utils/passport')

const router = express.Router();

router.post('/register', createAdmin);
router.post('/login', authenticateAdmin);
router.get('/get', passport.authenticate('jwt', { session: false }), getAdminFromJWT)

module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/admin');
//change to {register, login}
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

//change to register/ login
module.exports = router;

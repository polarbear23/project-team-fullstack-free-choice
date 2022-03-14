const express = require('express');
const { createCompetition, getCompetitionById, } = require('../controllers/competition');
const passport = require('passport');

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), createCompetition);
router.get('/', passport.authenticate('jwt', { session: false }), getCompetitionById);


module.exports = router;

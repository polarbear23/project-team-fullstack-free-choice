const express = require('express');
const passport = require('passport');

const { createCompetition, getCompetitionById, } = require('../controllers/competition');


const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), createCompetition);
router.get('/', passport.authenticate('jwt', { session: false }), getCompetitionById);


module.exports = router;

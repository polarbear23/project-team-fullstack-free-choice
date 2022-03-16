const express = require('express');
const passport = require('passport')

const { createSeason, getSeasonsByCompetition } = require('../controllers/season');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createSeason);
router.get('/', getSeasonsByCompetition);

module.exports = router;

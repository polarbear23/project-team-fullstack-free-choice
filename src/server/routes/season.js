const express = require('express');
const passport = require('passport')

const { createSeason, getSeasonsByCompetition, getSeasonById } = require('../controllers/season');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createSeason);
router.get('/', getSeasonsByCompetition);
router.get('/id', passport.authenticate('jwt', { session: false }), getSeasonById)

module.exports = router;

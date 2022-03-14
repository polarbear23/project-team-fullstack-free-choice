const express = require('express');
const passport = require('passport');

const { createRound, getAllRoundsBySeasonId } = require('../controllers/round');

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), createRound);
router.get('/', passport.authenticate('jwt', { session: false }), getAllRoundsBySeasonId);

module.exports = router;
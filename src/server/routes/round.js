const express = require('express');
//const passport = require('passport');

const { createRound, getAllRoundsBySeasonId } = require('../controllers/round');

const router = express.Router();

router.post('/', createRound);
router.get('/', getAllRoundsBySeasonId);

module.exports = router;
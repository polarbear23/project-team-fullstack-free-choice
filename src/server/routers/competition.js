const express = require("express");
const { competition } = require("../controllers/competition");

const router = express.Router();

router.post("/competition", competition);

module.exports = router;

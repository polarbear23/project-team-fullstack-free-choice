const express = require("express");
const { competitor } = require("../controllers/competitor");

const router = express.Router();

router.post("/competitor", competitor);

module.exports = router;

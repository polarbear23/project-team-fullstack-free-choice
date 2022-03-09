const express = require("express");
const { placement } = require("../controllers/placement");

const router = express.Router();

router.post("/placement", placement);

module.exports = router;

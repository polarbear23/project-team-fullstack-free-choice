const express = require("express");
const { admin } = require("../controllers/admin");

const router = express.Router();

router.post("/admin", admin);

module.exports = router;

const express = require("express");
const { stkPush, callback } = require("../controllers/mpesaController");

const router = express.Router();

router.post("/stkpush", stkPush);
router.post("/callback", callback);

module.exports = router;
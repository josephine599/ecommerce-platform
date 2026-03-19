const express = require("express");
const { stkPush, callback } = require("../controllers/mpesaController");

const router = express.Router();

console.log("========= M-Pesa Routes Loaded =========");

// Debug endpoint to check M-Pesa configuration
router.get("/debug", (req, res) => {
  res.json({
    mpesaConfigured: {
      consumerKey: !!process.env.MPESA_CONSUMER_KEY,
      consumerSecret: !!process.env.MPESA_CONSUMER_SECRET,
      passKey: !!process.env.MPESA_PASSKEY,
      shortCode: process.env.MPESA_SHORTCODE || "174379"
    },
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 5000
  });
});

router.post("/stkpush", stkPush);
router.post("/callback", callback);

module.exports = router;
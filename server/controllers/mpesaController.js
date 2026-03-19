const axios = require("axios");

const stkPush = async (req, res) => {
  console.log("========= stkPush FUNCTION CALLED =========");
  try {
    const { phone, amount, email, firstName, lastName } = req.body;

    console.log("STK Push Request received:", { phone, amount, email });

    // Validate input
    if (!phone || !amount) {
      console.error("Missing phone or amount");
      return res.status(400).json({ 
        error: "Phone and amount are required",
        received: { phone: !!phone, amount: !!amount }
      });
    }

    // Validate phone format - must have at least 9 digits
    const phoneDigits = phone.toString().replace(/[^0-9]/g, '');
    console.log("Phone validation details:", { original: phone, digits: phoneDigits, length: phoneDigits.length });
    
    if (phoneDigits.length < 9) {
      console.error("Phone validation failed - insufficient digits");
      return res.status(400).json({ 
        error: "Invalid phone number. Must contain at least 9 digits.",
        details: `Received ${phoneDigits.length} digits`
      });
    }

    // Validate amount
    const amountNum = Number(amount);
    console.log("Amount validation details:", { original: amount, parsed: amountNum, isValid: !isNaN(amountNum) && amountNum > 0 });
    
    if (isNaN(amountNum) || amountNum < 1) {
      console.error("Amount validation failed");
      return res.status(400).json({ 
        error: "Invalid amount. Must be a positive number.",
        received: amount
      });
    }

    // Check test mode first
    const testMode = process.env.MPESA_TEST_MODE === "true";
    
    console.log("M-Pesa Configuration:", {
      testModeEnabled: testMode,
      testModeValue: process.env.MPESA_TEST_MODE,
      nodeEnv: process.env.NODE_ENV
    });

    // TEST MODE - Return mock response immediately
    if (testMode) {
      console.log("🧪 TEST MODE ENABLED - Returning mock M-Pesa response");
      
      // Format phone number
      let formattedPhone = phone.toString().replace(/^0/, "254").replace(/[^0-9]/g, "");
      if (!formattedPhone.startsWith("254")) {
        formattedPhone = "254" + formattedPhone;
      }

      const mockCheckoutRequestId = `WEB${Date.now()}TEST${formattedPhone.slice(-4)}`;
      
      console.log("Mock response prepared:", { mockCheckoutRequestId, formattedPhone });
      
      return res.json({
        success: true,
        message: "🧪 TEST MODE: Mock STK push response",
        checkoutRequestId: mockCheckoutRequestId,
        data: {
          ResponseCode: "0",
          ResponseDescription: "Success. Request accepted for processing",
          CheckoutRequestID: mockCheckoutRequestId,
          CustomerMessage: "[TEST MODE] Enter your M-Pesa PIN to complete this transaction"
        },
        testMode: true,
        info: "To enable production mode, set MPESA_TEST_MODE=false"
      });
    }

    // PRODUCTION MODE - Check credentials
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const businessShortCode = process.env.MPESA_SHORTCODE || "174379";
    const passKey = process.env.MPESA_PASSKEY;

    console.log("M-Pesa Credentials Check:", {
      consumerKey: consumerKey ? "✓ Set" : "✗ Missing",
      consumerSecret: consumerSecret ? "✓ Set" : "✗ Missing",
      businessShortCode: businessShortCode || "174379",
      passKey: passKey ? "✓ Set" : "✗ Missing"
    });

    if (!consumerKey || !consumerSecret || !passKey) {
      console.error("Production mode but missing credentials");
      return res.status(500).json({ 
        error: "M-Pesa credentials not properly configured",
        info: "Set MPESA_TEST_MODE=true for testing or provide valid credentials"
      });
    }

    // Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    console.log("Requesting M-Pesa access token...");
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log("✓ Access token received");

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${businessShortCode}${passKey}${timestamp}`).toString("base64");

    // Format phone number
    let formattedPhone = phone.toString().replace(/^0/, "254").replace(/[^0-9]/g, "");
    if (!formattedPhone.startsWith("254")) {
      formattedPhone = "254" + formattedPhone;
    }

    console.log(`Initiating STK push for: ${formattedPhone}, Amount: KES ${amountNum}`);

    // Initiate STK push
    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amountNum),
        PartyA: formattedPhone,
        PartyB: businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.CALLBACK_URL || "http://localhost:5000"}/api/mpesa/callback`,
        AccountReference: email || `ORDER-${Date.now()}`,
        TransactionDesc: "JozeyStore Purchase"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✓ STK Push Response:", {
      ResponseCode: stkResponse.data.ResponseCode,
      CheckoutRequestID: stkResponse.data.CheckoutRequestID,
      ResponseDescription: stkResponse.data.ResponseDescription
    });

    if (stkResponse.data.ResponseCode === "0") {
      return res.json({
        success: true,
        message: "STK push initiated successfully. Check your phone for the M-Pesa prompt.",
        checkoutRequestId: stkResponse.data.CheckoutRequestID,
        data: stkResponse.data
      });
    } else {
      console.error("M-Pesa STK Push failed:", stkResponse.data);
      return res.status(400).json({
        error: stkResponse.data.ResponseDescription || "STK push failed",
        responseCode: stkResponse.data.ResponseCode
      });
    }

  } catch (error) {
    console.error("M-Pesa STK Push Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack
    });

    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: "M-Pesa authentication failed",
        details: "Invalid consumer key or secret"
      });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({ 
        error: "Invalid M-Pesa request parameters",
        details: error.response.data?.errorMessage || error.message
      });
    }

    // Generic error
    res.status(500).json({ 
      error: "M-Pesa payment initiation failed",
      message: error.message
    });
  }
};

const callback = async (req, res) => {
  try {
    const { Body } = req.body;
    
    console.log("M-Pesa Callback:", Body);

    // Handle successful payment
    if (Body.stkCallback.ResultCode === 0) {
      const metadata = Body.stkCallback.CallbackMetadata.Item;
      const amount = metadata.find(item => item.Name === "Amount")?.Value;
      const phone = metadata.find(item => item.Name === "PhoneNumber")?.Value;
      const mpesaCode = metadata.find(item => item.Name === "MpesaReceiptNumber")?.Value;

      console.log(`Payment received: ${amount} from ${phone}, Receipt: ${mpesaCode}`);

      res.json({ message: "Payment processed successfully" });
    } else {
      console.log(`Payment failed with code: ${Body.stkCallback.ResultCode}`);
      res.json({ message: "Payment cancelled" });
    }
  } catch (error) {
    console.error("Callback Error:", error);
    res.status(500).json({ message: "Callback processing failed" });
  }
};

module.exports = { stkPush, callback };
const axios = require("axios");

const stkPush = async (req, res) => {
  try {
    const { phone, amount, email, firstName, lastName } = req.body;

    // Validate input
    if (!phone || !amount) {
      return res.status(400).json({ message: "Phone and amount are required" });
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const businessShortCode = process.env.MPESA_SHORTCODE || "174379";
    const passKey = process.env.MPESA_PASSKEY;

    console.log("M-Pesa Config:", {
      consumerKey: consumerKey ? "✓" : "✗",
      consumerSecret: consumerSecret ? "✓" : "✗",
      businessShortCode,
      passKey: passKey ? "✓" : "✗"
    });

    if (!consumerKey || !consumerSecret || !passKey) {
      return res.status(500).json({ 
        message: "M-Pesa credentials not properly configured",
        missing: {
          consumerKey: !consumerKey,
          consumerSecret: !consumerSecret,
          passKey: !passKey
        }
      });
    }

    // Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    console.log("Requesting access token...");
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log("Access token received ✓");

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${businessShortCode}${passKey}${timestamp}`).toString("base64");

    // Format phone number (add 254 if needed)
    let formattedPhone = phone.toString().replace(/^0/, "254").replace(/[^0-9]/g, "");
    if (!formattedPhone.startsWith("254")) {
      formattedPhone = "254" + formattedPhone;
    }

    console.log(`Initiating STK push for: ${formattedPhone}, Amount: ${amount}`);

    // Initiate STK push
    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
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

    console.log("STK Push Response:", stkResponse.data);

    res.json({
      message: "STK push initiated successfully",
      data: stkResponse.data,
      checkoutRequestId: stkResponse.data.CheckoutRequestID
    });

  } catch (error) {
    console.error("M-Pesa Error:", {
      message: error.message,
      response: error.response?.data || "No response data"
    });
    res.status(500).json({ 
      message: "M-Pesa request failed", 
      error: error.response?.data?.errorMessage || error.message 
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
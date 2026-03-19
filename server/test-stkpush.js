require('dotenv').config();

const { stkPush } = require('./controllers/mpesaController.js');

const mockReq = {
  body: {
    phone: "0703290162",
    amount: 100,
    email: "test@example.com"
  }
};

const mockRes = {
  statusCode: 200,
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log(`\n✅ Response (${this.statusCode || 200}):`, JSON.stringify(data, null, 2));
  }
};

console.log("Testing stkPush function with TEST_MODE=", process.env.MPESA_TEST_MODE);
console.log("Request body:", mockReq.body);

stkPush(mockReq, mockRes).catch(err => {
  console.error("❌ Error:", err.message);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});

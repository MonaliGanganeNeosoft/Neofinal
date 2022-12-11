const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  getPaymentkey,

  createOrders,
  payOrders,
  listOrders,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);



// router.route("/get-razorpay-key").get(isAuthenticatedUser,getPaymentkey);
// router.route("/create-order").post(isAuthenticatedUser,createOrders)
// router.route("/pay-order").post(isAuthenticatedUser,payOrders)
// router.route("/list-orders").get(isAuthenticatedUser,listOrders)
module.exports = router;
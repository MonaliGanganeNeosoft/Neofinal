const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const Order = mongoose.model('Order', OrderSchema);
// const Order=require("../models/orderModel")
// const Razorpay=require("../models/orderModel")
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "NeoStore",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});


exports.getPaymentkey=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).json({key: process.env.RAZORPAY_KEY_ID})
})

// exports.createOrders=catchAsyncErrors(async(req,res,next)=>{
//   const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });
//   // const options = {
//   //   amount: req.body.amount,
//   //   currency: 'INR',
//   // };
//   const order = await instance.orders.create({
//     amount: req.body.amount,
//     currency: 'INR',
//   });
//   res.status(200)
//   .json({success:true})
//   // if (!order) return res.status(500).send('Some error occured');
//   // res.send(order);
// } )

// exports.payOrders=catchAsyncErrors(async(req,res,next)=>{
//   const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
//       req.body;
//     const newOrder = Order({
//       isPaid: true,
//       amount: amount,
//       razorpay: {
//         orderId: razorpayOrderId,
//         paymentId: razorpayPaymentId,
//         signature: razorpaySignature,
//       },
//     });
//     await newOrder.save();
//     res.send({
//       msg: 'Payment was successfull',
//     });
//     res.status(500).send(error);
// })

// exports.listOrders=catchAsyncErrors(async(req,res,next)=>{
//   const orders = await Order.find();
//   res.send(orders);
// })

// // exports.listOrders=catchAsyncErrors(async(req,res,next)=>{
// //   const orders = await Order.find();
// //   res.send(orders);
// // })

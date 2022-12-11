import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
  
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
//********** */

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function Payment() {
//   const [loading, setLoading] = useState(false);
//   const [orderAmount, setOrderAmount] = useState(0);
//   const [orders, setOrders] = useState([]);

//   async function fetchOrders() {
//     const { data } = await axios.get('/api/v1/list-orders');
//     setOrders(data);
//   }
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   function loadRazorpay() {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onerror = () => {
//       alert('Razorpay SDK failed to load. Are you online?');
//     };
//     script.onload = async () => {
//       try {
//         setLoading(true);
//         const result = await axios.post('/api/v1/create-order', {
//           amount: orderAmount + '00',
//         });
//         const { amount, id: order_id, currency } = result.data;
//         const {
//           data: { key: razorpayKey },
//         } = await axios.get('/api/v1/get-razorpay-key');

//         const options = {
//           key: razorpayKey,
//           amount: amount.toString(),
//           currency: currency,
//           name: 'example name',
//           description: 'example transaction',
//           order_id: order_id,
//           handler: async function (response) {
//             const result = await axios.post('/api/v1/pay-order', {
//               amount: amount,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpaySignature: response.razorpay_signature,
//             });
//             alert(result.data.msg);
//             fetchOrders();
//           },
//           prefill: {
//             name: 'example name',
//             email: 'email@example.com',
//             contact: '111111',
//           },
//           notes: {
//             address: 'example address',
//           },
//           theme: {
//             color: '#80c0f0',
//           },
//         };

//         setLoading(false);
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//       } catch (err) {
//         alert(err);
//         setLoading(false);
//       }
//     };
//     document.body.appendChild(script);
//   }

//   return (
//     <div className="App">
//       <h1> Razorpay Example: Node & React</h1>
//       <hr />
//       <div>
//         <h2> Pay Order</h2>
//         <label>
//           Amount:{' '}
//           <input
//             placeholder="INR"
//             type="number"
//             value={orderAmount}
//             onChange={(e) => setOrderAmount(e.target.value)}
//           ></input>
//         </label>

//         <button disabled={loading} onClick={loadRazorpay}>
//           Razorpay
//         </button>
//         {loading && <div>Loading...</div>}
//       </div>
//       <div className="list-orders">
//         <h2>List Orders</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>AMOUNT</th>
//               <th>ISPAID</th>
//               <th>RAZORPAY</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((x) => (
//               <tr key={x._id}>
//                 <td>{x._id}</td>
//                 <td>{x.amount / 100}</td>
//                 <td>{x.isPaid ? 'YES' : 'NO'}</td>
//                 <td>{x.razorpayPaymentId}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Payment;
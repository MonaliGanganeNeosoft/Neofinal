import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

import {
 
  getAllOrders
} from "../../actions/orderAction";

const ConfirmOrder = ({ history }) => {

  // const { error, orders } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);
  const currentLocation = useLocation()
  const currentOrder = currentLocation.orderItem;
   console.log(currentOrder)

 // const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const cartItems = currentOrder.orderItems
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product_cost,
    0
  );

  

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax ;

  const address = `${currentOrder.shippingInfo.address}, ${currentOrder.shippingInfo.city}, ${currentOrder.shippingInfo.state}, ${currentOrder.shippingInfo.pinCode}, ${currentOrder.shippingInfo.country}`;

  // const proceedToPayment = () => {
  //   const data = {
  //     subtotal,
  //     shippingCharges,
  //     tax,
  //     totalPrice,
  //   };

  //   sessionStorage.setItem("orderInfo", JSON.stringify(data));

  //   history.push("/admin/orders");
  // };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Address</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.first_name} {user.last_name} </span>
                
              </div>
              <div>
                <p>Phone:</p>
                <span>{user.phone_no}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.product_image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.product_name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.product_cost} ={" "}
                      <b>₹{item.product_cost * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              {/* <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div> */}
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={(e)=>window.print()}>download pdf</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
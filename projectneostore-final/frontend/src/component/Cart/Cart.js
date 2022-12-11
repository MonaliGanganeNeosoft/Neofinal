import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

import CheckoutSteps from "../Cart/CheckoutSteps1";


const Cart = ({history}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, product_stock) => {
    const newQty = quantity + 1;
    if (product_stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  // const checkoutHandler = () => {
  //   history.push("/login?redirect=shipping");
  // };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product_cost,
    0
  );
  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax ;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/login?redirect=shipping");
  };
  

  return (
    <>
    
    <CheckoutSteps activeStep={0} />
    {

      cartItems.length === 0 ? (<div className="emptyCart">
      <RemoveShoppingCartIcon />

      <Typography>No Product in Your Cart</Typography>
      <Link to="/products">View Products</Link>
    </div>):(<Fragment>
      <div className="cartPage" style={{display:"flex",flexWrap:"wrap"}}>
            <div className="tableright" style={{width:"800px"}}>
            <div className="cartHeader">
                <p>Product</p>
                <p style={{paddingLeft:"15px"}}>Quantity</p>
                <p style={{paddingLeft:"15px"}}>Price</p>
                <p style={{paddingLeft:"50px"}}>Total</p>
                <p style={{paddingLeft:"50px"}}>Delete</p>
            </div>

            {cartItems && cartItems.map((item)=>(
              <div className="cartContainer" key={item.product}>
              
              <CartItemCard item={item} deleteCartItems={deleteCartItems} />

              <div className="cartInput">
              <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={()=>increaseQuantity(item.product,item.quantity,item.product_stock)} >+</button>
              </div>
              <p className="cartPrice"> {`₹${item.product_cost}`}</p>
              <p className="cartSubtotal">{`Rs${item.product_cost * item.quantity}`}</p>
              <p className="cartDelete" onClick={() => deleteCartItems(item.product)}><i class="far fa-trash-alt"></i></p> 
            </div>

            ))}
            
          </div>
        <div className="cartGrossProfit" style={{width:"400px"}}>
        
                  <div className="orderSummary" style={{marginTop:"1px",paddingTop:"2px",paddingLeft:"70px"}}>
                      <Typography>Review Order</Typography>
                      <div>
                        <div>
                          <p>Subtotal:</p>
                          <span>₹{subtotal}</span>
                        </div>
                        
                        <div>
                          <p>GST:</p>
                          <span>₹{tax}</span>
                        </div>
                        <div>
                          <p>Order Total:</p>
                          <span>₹{totalPrice}</span>
                        </div>
                      </div>

                      <button onClick={proceedToPayment}>Proceed to Buy</button>
                      
                    </div>
                
             
              
        </div>

        
      </div>
    </Fragment>)
    }
    </>
  );
};

export default Cart;


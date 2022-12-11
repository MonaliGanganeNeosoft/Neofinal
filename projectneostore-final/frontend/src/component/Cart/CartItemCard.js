import React from 'react';
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({item,deleteCartItems}) => {
  return (
    <div className='CartItemCard'>
      <img src={item.product_image} alt="ssa" />
       <div>
        <Link to={`/product/${item.product}`}>{item.product_name}</Link>
        <Link to={`/product/${item.product}`}>{item.product_producer}</Link>
        
        {/* <span>{`Price: ₹${item.product_cost}`}</span> */}
               <p>
                      Status:
                      <b className={item.product.product_stock < 1 ? "redColor" : "greenColor"}>
                        {item.product.product_stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
               </p>
        
 {/* <p onClick={() => deleteCartItems(item.product)}>Remove</p>       */}
        </div>
      
    </div>
  )
}

export default CartItemCard;


import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails"
import Products from './component/Product/Products';
import Login from "./component/User/Login";
import Register from "./component/User/Register";


import store from "./store";
import {loadUser} from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions"
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping"
import Addaddress from "./component/Cart/Addaddress";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import UpdateAddress from "./component/Cart/UpdateAddress";
import axios from "axios";
import Payment from "./component/Cart/Payment";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"

import MyOrders from "./component/Order/Myorders";
import OrderSuccess from "./component/Cart/OrderSuccess"

import OrderList from "./component/Admin/OrderList";
import ConfirmOrd from "./component/Cart/ConfirmOrd"
// import Search from "./component/Product/Search";
import Subscribe from './component/Subscribe';
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList"
import NewProduct from './component/Admin/NewProduct';
function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  
  useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  return (
   <>
   <Router>
     <Header />
     {/* {isAuthenticated && <UserOptions user={user}/>} */}
     <Route exact path="/" component={Home} />
     <Route exact path="/product/:id" component={ProductDetails} />
     <Route exact path="/products" component={Products}/>
     <Route  path="/products/:keyword" component={Products}/>
     
     
     <ProtectedRoute exact path="/account" component={Profile} />
     <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
     <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
     <Route exact path="/password/forgot" component={ForgotPassword}/>
     <Route exact path="/password/reset/:token" component={ResetPassword} />
     
     <Route exact path="/login" component={Login} />
     <Route exact path="/register" component={Register} />
     <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping}/>
      <ProtectedRoute exact path="/addAddress" component={Addaddress}/>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
      <ProtectedRoute exact path="/order/confirmss" component={ConfirmOrd}/>
     
      <ProtectedRoute exact path="/me/updateAddress" component={UpdateAddress}/>
     
      {/* <Route exact path="/search" component={Search}></Route> */}
      {stripeApiKey && (
       <Elements stripe={loadStripe(stripeApiKey)}> 
          <ProtectedRoute exact path="/process/payment" component={Payment}/>
   
      </Elements> 
       )} 
      <ProtectedRoute exact path="/success" component={OrderSuccess} />

      <ProtectedRoute exact path="/orders" component={MyOrders} />


        <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrderList} />
        <ProtectedRoute exact path="/admin/dashboard" isAdmin={true} component={Dashboard} />
        <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />
        <ProtectedRoute exact path="/admin/product" isAdmin={true} component={NewProduct} />
         
        <Route exact path="/subscribe" component={Subscribe} />
       <Footer />
   </Router>
   
  
   </>
  );
}


export default App;

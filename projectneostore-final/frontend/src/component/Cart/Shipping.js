import React, { Fragment, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdAccountBox, MdLibraryBooks } from "react-icons/md";

import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "react-bootstrap";
import { saveShippingInfo } from "../../actions/cartAction";
const Shipping = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  //   const subtotal = cartItems.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0
  //   );
  //   const tax = subtotal * 0.18;
  //   const totalPrice = subtotal + tax ;

  const proceedToPayment = () => {
    // const data = {
    //   subtotal,
    //   tax,
    //   totalPrice,
    // };

    // sessionStorage.setItem("orderInfo", JSON.stringify(data));

    //history.push("/order/confirm");
    history.push("/process/payment");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="outerclass"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="p-4" style={{ width: "400px" }}>
              <h3>My Account</h3>
              <hr />
              <div className="myaccountmain">
                <div style={{ width: "200%" }}>
                  <div
                    className="imginnerprofile"
                    style={{ width: "200%", paddingLeft: "60px" }}
                  >
                    <img
                      style={{ borderRadius: "50px" }}
                      src={user.avatar.url}
                      alt={user.name}
                    />
                  </div>
                  <p className="text-center" style={{ marginTop: "10px" }}>
                    {user.first_name} {user.last_name}
                  </p>

                  <div className="myaccountsidebar">
                    <button className="btn w-100">
                      <HiOutlineMenuAlt2
                        style={{ margin: "0 4 4 0", fontSize: "larger" }}
                      />
                      <Link to="/admin/orders">Orders</Link>
                    </button>
                    <button className="btn w-100">
                      <MdAccountBox
                        style={{ margin: "0 4 4 0", fontSize: "larger" }}
                      />
                      <Link to="/account">Profile</Link>
                    </button>
                    <button className="btn w-100">
                      <MdLibraryBooks
                        style={{ margin: "0 4 4 0", fontSize: "larger" }}
                      />
                      <Link to="/shipping">Address</Link>
                    </button>
                    <button className="btn w-100">
                      <BsArrowLeftRight
                        style={{ margin: "0 4 4 0", fontSize: "larger" }}
                      />
                      <Link to="/password/update">Change Password</Link>
                    </button>
                  </div>
                </div>
                <div style={{ width: "70%" }}></div>
              </div>
            </div>
            <div className="p-6" style={{ width: "800px" }}>
              <div
                className="p-3"
                style={{
                  borderRadius: "10px",
                  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
                }}
              >
                <h2>Address</h2>
                <hr />
                <table>
                  <tbody>
                    <tr>
                      {/* <td>address</td> */}
                      <td>{address}</td>
                    </tr>
                    {/* <tr>
                                        <td>pincode</td>
                                        <td>{address.pincode}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td>city</td>
                                        <td>{address.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Number</td>
                                        <td>{user.phone_no}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{user.email}</td>
                                    </tr> */}
                  </tbody>
                </table>
                <hr />
                <p>
                  <Button variant="light">
                    <MdModeEditOutline
                      style={{ fontSize: "large", marginRight: "5px" }}
                    />
                    <Link to="/me/updateAddress">Edit Address</Link>
                  </Button>
                </p>
              </div>
              {/* <div
                className="p-3"
                style={{
                  borderRadius: "10px",
                  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
                }}
              >
                <h2>Add Address</h2>

                <p>
                  <Button variant="light">
                    <Link to="/addAddress">Add Address</Link>
                  </Button>
                </p>
              </div> */}
              <div
                className="p-3"
                style={{
                  borderRadius: "10px",
                  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
                }}
              >
                <h2>Process to Payment</h2>

                <p>
                  <Button variant="primary" onClick={proceedToPayment}>
                    Checkout
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Shipping;

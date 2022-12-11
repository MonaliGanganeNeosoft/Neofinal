import React, { useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdAccountBox, MdLibraryBooks } from "react-icons/md";

import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

import "./myOrders.css";
import { useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Card, Button } from "react-bootstrap";

const Myorders = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  const Ordering = [0];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
                <div
                  className="p-6"
                  style={{
                    border: "2px solid red",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                      <div
                        className="p-4"
                        style={{ border: "2px solid red", width: "400px" }}
                      >
                        <h3>My Account</h3>
                        <hr />
                        <div className="myaccountmain">
                          <div style={{ width: "200%", border: "2px solid red" }}>
                            <div>
                              <img src={user.avatar.url} alt={user.first_name} />
                              <p className="text-center">
                                {user.first_name} {user.last_name}
                              </p>

                             
                            </div>
                            <div className="myaccountsidebar">
                              <button className="btn w-100">
                                <HiOutlineMenuAlt2
                                  style={{ margin: "0 4 4 0", fontSize: "larger" }}
                                />
                                <Link to="/orders">Orders</Link>
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
                      <hr />

            {
              <div
                className="lastorders"
                style={{ border: "2px solid red", width: "800px" }}
              >
                <div
                  className="lastclass"
                  style={{
                    borderRadius: "10px",
                    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
                  }}
                >
                  <div>
                    {Ordering.map((ele, index) => (
                      <Card key={index} style={{}}>
                        {orders &&
                          orders.map((item) => (
                            <Card.Body>
                              <Card.Title>
                                <b style={{ color: "orange" }}>TRANSIT</b> Order
                                By:{`${item._id}`}
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                Placed on :{`${item.deliveredAt}`}{" "}
                                <span style={{ color: "green" }}>
                                  Price :
                                  {`Pay - ₹${
                                    orderInfo && orderInfo.totalPrice
                                  }`}
                                </span>
                              </Card.Subtitle>
                              <hr />
                              <Card.Text style={{border:"2px solid red",display:"flex",flexWrap:"wrap"}}>
                                {cartItems &&
                                  cartItems.map((item) => (
                                    <div className="imgmy" style={{border:"2px solid red",marginLeft:"20px"}}>
                                      <img
                                        src={item.product_image}
                                        alt="ssa"
                                        style={{ width: "100px" }}
                                      />
                                    </div>
                                  ))}
                              </Card.Text>
                              <hr />
                              <br />
                              <Button variant="primary">
                                <Link to="/order/confirm">
                                  {" "}
                                  Download Invoice as PDF
                                </Link>
                              </Button>
                            </Card.Body>
                          ))}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            }
          </div>
        </>
      )}
    </>
  );
};

export default Myorders;

import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Card,Button } from "react-bootstrap";

// import SideBar from "./Sidebar";
import {
 
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";


import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdAccountBox, MdLibraryBooks } from "react-icons/md";

import Loader from "../layout/Loader/Loader";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const { error, orders } = useSelector((state) => state.allOrders);

useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, history]);



  const Ordering = [0];
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
      <div className="p-6" style={{
                   
                    display: "flex",
                    flexWrap: "wrap",
                  }}>


                      <div
                        className="p-4"
                        style={{ width: "400px" }}
                      >
                        <h3>My Account</h3>
                        <hr />
                        <div className="myaccountmain">
                          <div style={{ width: "200%",}}>
                          <div className="imginnerprofile" style={{width: '200%', paddingLeft:"60px"}}>
                            <img style={{borderRadius:"50px"}} src={user.avatar.url} alt={user.name} />
                                        

                             
                            </div>
                            <p className='text-center' style={{marginTop:"10px"}}>{user.first_name} {user.last_name}</p>
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
                      <hr />
                  

    {
              <div
                className="lastorders"
                style={{ width: "800px" }}
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
                                  {`Pay -${item.totalPrice} `}
                                </span>
                              </Card.Subtitle>
                              <hr />
                              
                              
                  <Card.Text style={{display:"flex",flexWrap:"wrap"}}>
                   
                    {
                        <div className="imgmy" style={{marginLeft:"20px"}}>
                          {
                            item.orderItems.map(item_product=>{
                              return (
                                <img
                                        src={item_product.product_image}
                                        alt="ssa"
                                        style={{ width: "100px",paddingLeft:"20px" }}
                                />
                              )
                            })
                          }
                                      
                                    
                        </div>
                     }         


                  </Card.Text>
                              <hr />
                              <br />
                              <Button variant="primary">
                                <Link to={{pathname:"/order/confirmss",orderItem:item}}>
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
      
    </Fragment>
  );
};

export default OrderList;
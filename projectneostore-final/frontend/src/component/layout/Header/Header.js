import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MdAccountBox } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
// import Search from "./Search";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../../actions/userAction';


const Header = ({user}) => {
  const [keyword, setKeyword] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
   let history = useHistory();
   const dispatch = useDispatch();
  // const searchSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e)
  //   if (keyword.trim()) {
  //     history.push(`/products?keyword=${keyword}`);
  //   } else {
  //     history.push("/products");
  //   }
  // };


  // function logoutUser() {
  //   dispatch(logout());
  //   alert.success("Logout Successfully");
  // }
 const logoutUser=()=>{
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand
            style={{
              color: "white",
              fontSize: "x-large",
              margin: " auto 5vw",
            }}
          >
            Neo<span style={{ color: "red", fontWeight: "bold" }}>STORE</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
                <Link to="/products">Products</Link>
              </Nav.Link>
            </Nav>

            
            {/* <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
                <Link to="/orders">Orders</Link>
              </Nav.Link>
            </Nav> */}

            {/* <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
                <Link to="/admin/orders">Orders</Link>
              </Nav.Link>
            </Nav>
             */}
              
              <form className="searchBox" onSubmit={(e)=>{
                e.preventDefault();
                document.getElementById('myInput').value = ''
                  console.log(e)
                  if (keyword.trim()) {
                    // history.push(`/products?keyword=${keyword}`);
                    history.push(`/products/${keyword}`);
                  } else {
                    history.push("/products");
                  }
              }}>
                <input
                  type="text"
                  id="myInput"
                  placeholder="Search a Product ..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" style={{backgroundColor:"MediumSeaGreen",color:"white"}} />
              </form>

            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "70px",
                  height: "40px",
                  borderRadius: "5px",
                }}
              >
                <p className="d-flex justify-content-center align-items-center h-100 m-0">
                  <FaShoppingCart style={{ fontSize: "large" }} />
                  <span
                    style={{
                      position: "relative",
                      bottom: "10px",
                      borderRadius: "50%",
                      fontWeight: "bold",
                      fontSize: "small",
                      backgroundColor: "#ff1656",
                      color: "white",
                      padding: "0px 2px",
                    }}
                  >{`${cartItems.length}`}</span>
                  <Link to="/cart">Cart</Link>
                </p>
              </div>
            </Nav>
            <NavDropdown
              title={
                <MdAccountBox
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "30px",
                    height: "27px",
                  }}
                />
              }
              id="navbarScrollingDropdown"
              style={{
                marginRight: "7vw",
                width: "70px",
                height: "40px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              <NavDropdown.Item>
                <Link to="/login">My Account</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/account">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/admin/dashboard">Admin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                {/* <Link to="/logout">Signout</Link>&nbsp;&nbsp; */}
                <p onClick={()=>logoutUser()}>Signout<RiLogoutCircleRLine /></p>
                {/* <RiLogoutCircleRLine /> */}
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

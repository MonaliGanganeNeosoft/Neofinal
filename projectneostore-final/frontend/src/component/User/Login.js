import React, { useRef, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { IoMdMail } from "react-icons/io";
import { ImFacebook, ImGoogle, ImTwitter } from "react-icons/im";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

// import axios from 'axios';
// import SocialButton from './SocialButton';
import SocialLogin from './SocialLogin';

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    // console.log("login form submitted")
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const [showpassword, setShowPassword] = useState(false);

  const [data,setData]=useState("");
  const handleSocialLogin = (user) => {
    console.log(user);
    setData(user._profile);
    window.location.href="/Products"
    };

const handleSocialLoginFailure = (err) => {
    alert('sorry login failed.')
};
  
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="loginpage">
            <div className="socialLogin">
              <div style={{ backgroundColor: "#4267B2" }}>
                <ImFacebook
                  style={{ fontSize: "xx-large", paddingRight: "10px" }}
                />
                Login with Facebook
              </div>
              {/* <div style={{ backgroundColor: "#DB4437" }}>
                <ImGoogle
                  style={{ fontSize: "xx-large", paddingRight: "10px" }}
                />
               
                  Login with Google
              </div> */}
              <SocialLogin
                    style={{ backgroundColor: '#DB4437', width: '30vw', height: '10vh' }}
                    className="google"
                    provider="google"
                    appId="1086141032379-tt02ofcajhv85psgoni7mj1s6d6l2mkp.apps.googleusercontent.com"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}>
                    <ImGoogle className="fs-4 me-2" />Login with Google
              </SocialLogin>
 

              <div style={{ backgroundColor: "#1DA1F2" }}>
                <ImTwitter
                  style={{ fontSize: "xx-large", paddingRight: "10px" }}
                />
                Login with Twitter
              </div>
              <p className="w-100 text-end">
                <span style={{ cursor: "pointer" }}>
                  <Link to="/register">Register Now</Link>
                </span>
              </p>
            </div>

            <hr />

            <div className="login">
              <Form ref={loginTab} onSubmit={loginSubmit}>
                <h3>Login to NeoSTORE</h3>
                <Form.Group>
                  <InputGroup>
                    <FormControl
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                    <IoMdMail className="iconlogin" />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <InputGroup>
                    <FormControl
                      name="password"
                      placeholder="Password"
                      type={showpassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {showpassword ? (
                      <BsEyeFill
                        className="iconlogin"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="iconlogin"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </InputGroup>
                </Form.Group>
                <Button type="submit">Login</Button>
              </Form>
              <p className="w-100 text-start">
                <span style={{ cursor: "pointer" }}>
                  <Link to="/password/forgot">Forget Password ?</Link>
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

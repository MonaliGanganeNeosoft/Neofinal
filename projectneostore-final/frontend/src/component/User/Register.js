import React, { useRef, useState, useEffect } from "react";

import Loader from "../layout/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { IoMdMail } from "react-icons/io";
import { ImFacebook, ImGoogle, ImTwitter } from "react-icons/im";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";

import SocialLogin from "./SocialLogin";

const Register = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const registerTab = useRef(null);

  const [user, setUser] = useState({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    phone_no:"",
    dob:"",

  });
  const { first_name,last_name, email, password,phone_no,dob } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("first_name", first_name);
    myForm.set("last_name",last_name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("phone_no",phone_no);
    myForm.set("avatar", avatar);
    myForm.set("dob",dob)
    //console.log("signup form submitted")
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Form
              className="registration"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="d-flex justify-content-center">
                <SocialLogin
                  style={{ backgroundColor: "#4267B2" }}
                  className="facebook"
                  provider="facebook"
                  appId="530980681768179"
                  // onLoginSuccess={handleSocialLogin}
                  // onLoginFailure={handleSocialLoginFailure}
                >
                    <ImFacebook
                      style={{ fontSize: "xx-large", paddingRight: "10px" }}
                    />
                       Login with Facebook
                </SocialLogin>


                <SocialLogin
                  style={{ backgroundColor: "#DB4437" }}
                  className="google"
                  provider="google"
                  appId="443267988237-4lch3ldhcbf9150nm7urethq8kaicd9o.apps.googleusercontent.com"
                  // onLoginSuccess={handleSocialLogin}
                  // onLoginFailure={handleSocialLoginFailure}
                >
                        <ImGoogle
                          style={{ fontSize: "xx-large", paddingRight: "10px" }}
                        />
                           Login with Google
                </SocialLogin>

                
              </div>
              <hr />
              <h3>Register to NeoSTORE</h3>
              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="first_name"
                    required
                    name="first_name"
                    value={first_name}
                    onChange={registerDataChange}
                  />
                  {/* change icon here */}
                </InputGroup>
              </Form.Group>


              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="last_name"
                    required
                    name="last_name"
                    value={last_name}
                    onChange={registerDataChange}
                  />
                  {/* change icon here */}
                </InputGroup>
              </Form.Group>


              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <IoMdMail className="iconlogin" />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <FormControl
                    placeholder="Password"
                    type={showpassword ? "text" : "password"}
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
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


              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="number"
                    placeholder="phone_no"
                    required
                    name="phone_no"
                    value={phone_no}
                    onChange={registerDataChange}
                  />
                  {/* change icon here */}
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="dob"
                    required
                    name="dob"
                    value={dob}
                    onChange={registerDataChange}
                  />
                  {/* change icon here */}
                </InputGroup>
              </Form.Group>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>

              <Button type="submit">Register</Button>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default Register;

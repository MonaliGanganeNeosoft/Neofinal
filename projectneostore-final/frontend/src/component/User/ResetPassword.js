import React, { Fragment, useState, useEffect } from "react";

import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { AiOutlineInfo } from 'react-icons/ai'
import { MdPhone, MdInfo } from 'react-icons/md'
import { Container, Form, FormControl, InputGroup, Button } from 'react-bootstrap'

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);
  const [showpassword, setShowPassword] = useState(false)
  const [showconfirmpassword, setShowConfirmPassword] = useState(false)

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          
          
          <Container>
            <div className="login" >
                <Form style={{ width: '50vw', marginBottom: '20px', textAlign: 'center' }} className="resetPasswordForm"
                onSubmit={resetPasswordSubmit} >
                    <h2>Recover Password</h2><hr />
                    <Form.Group>
                        <InputGroup>
                            <FormControl type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
               type={showpassword ? "text" : "password"}  />
                            {showpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setShowPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setShowPassword(true)} />
                            }
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <FormControl type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
             type={showconfirmpassword ? "text" : "password"}  />
                            {showconfirmpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setShowConfirmPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setShowConfirmPassword(true)} />
                            }
                        </InputGroup>
                       
                    </Form.Group>
                    <Button type="submit" >Submit</Button>
                </Form>
            </div>
        </Container>



          
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;

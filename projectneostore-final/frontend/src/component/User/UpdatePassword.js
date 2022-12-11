import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";




import { useNavigate } from 'react-router-dom'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { AiOutlineInfo } from 'react-icons/ai'
import { MdPhone, MdInfo } from 'react-icons/md'
import { Container, Form, FormControl, InputGroup, Button } from 'react-bootstrap'



import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'
import { Link } from "react-router-dom";

import { MdModeEditOutline } from 'react-icons/md'




const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showpassword, setShowPassword] = useState(false)
  const [showconfirmpassword, setShowConfirmPassword] = useState(false)


  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />

         
            <div className="updateps" style={{display:"flex",flexWrap:"wrap"}}>
                <div className="p-4" style={{width:"400px"}}>
                      <h3>My Account</h3>
                      <hr />
                      <div className="myaccountmain">
                          <div style={{ width: '200%'} }>
                          <div className="imginnerprofile" style={{width: '200%', paddingLeft:"60px"}}>
                            <img style={{borderRadius:"50px"}} src={user.avatar.url} alt={user.name} />
                                        

                             
                            </div>
                            <p className='text-center' style={{marginTop:"10px"}}>{user.first_name} {user.last_name}</p>
                        
                              <div className="myaccountsidebar">
                                  <button className='btn w-100' ><HiOutlineMenuAlt2 style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/admin/orders">Orders</Link></button>
                                  <button className='btn w-100' ><MdAccountBox style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/account">Profile</Link></button>
                                  <button className='btn w-100' ><MdLibraryBooks style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/shipping">Address</Link></button>
                                  <button className='btn w-100' ><BsArrowLeftRight style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/password/update">Change Password</Link></button>
                              </div>
                          </div>
                          <div style={{ width: '70%' }}>
                            
                          </div>
                      </div>
                  </div>


                <div className="p-6" style={{width:"800px",marginTop:"40px"}}>
                      <Container>
                        <div className="login" >
                            <Form style={{ width: '50vw', marginBottom: '20px', textAlign: 'center' } }   className="updatePasswordForm"
                            onSubmit={updatePasswordSubmit}>
                            <Form.Group>
                                    <InputGroup>
                                        <FormControl  type="password"
                                placeholder="Old Password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
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
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                                        <FormControl  type="password"
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
                                <Button type="submit">Submit</Button>
                                
                            </Form>
                        </div>
                    </Container>
                    </div>
            </div>
    

        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;

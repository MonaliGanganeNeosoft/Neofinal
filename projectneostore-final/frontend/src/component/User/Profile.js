import React, { Fragment, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight , BsArrowUp,BsArrowDown} from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'



import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

import { MdModeEditOutline } from 'react-icons/md'
import { Button } from 'react-bootstrap'

const Profile = ({ history }) => {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

    
    return (
        <>
        {loading ? (<Loader />):(
            <>
            <div className="outerclass1" style={{display:"flex",flexWrap:"wrap"}}>
                    <div className="p-4" style={{width:"400px"}}>
                        <h3>My Account</h3>
                        <hr />
                        <div className="myaccountmain">
                            <div style={{ width: '200%' }}>
                                <div className="imginnerprofile" style={{width: '200%', paddingLeft:"60px"}}>
                                        <img style={{borderRadius:"50px"}} src={user.avatar.url} alt={user.name} />
                                        
                    
                                   
                                </div>
                                <p className='text-center' style={{marginTop:"10px"}}>{user.first_name} {user.last_name}</p>
                                <div className="myaccountsidebar">
                                    <button className='btn w-100' ><HiOutlineMenuAlt2 style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/admin/orders">Orders</Link></button>
                                    <button className='btn w-100' ><MdAccountBox style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Profile</button>
                                    <button className='btn w-100' ><MdLibraryBooks style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/shipping">Address</Link></button>
                                    <button className='btn w-100' ><BsArrowLeftRight style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/password/update">Change Password</Link></button>
                                   </div>
                            </div>
                            <div style={{ width: '70%' }}>
                            
                            </div>
                        </div>
                    </div>
                    <div className="p-6" style={{width:"800px"}}>
                    <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                        <h2>Profile</h2>
                        <hr />
                        <table >
                            <tbody >
                                <tr >
                                    <td>First Name</td>
                                    <td style={{paddingLeft:"20px"}}>{user.first_name}</td>
                                </tr>
                                <br/>
                                <tr>
                                    <td>Last Name</td>
                                    <td style={{paddingLeft:"20px"}}>    {user.last_name}</td>
                                </tr>
                                <br/>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td style={{paddingLeft:"20px"}}>    {user.dob}</td>
                                </tr>
                                <br/>
                                <tr>
                                    <td>Mobile Number</td>
                                    <td style={{paddingLeft:"20px"}}>    {user.phone_no}</td>
                                </tr>
                                <br/>
                                <tr>
                                    <td>Email</td>
                                    <td style={{paddingLeft:"20px"}}>    {user.email}</td>
                                </tr>
                                <br/>
                                <br/>
                            </tbody>
                        </table>
                        <hr />
                        <p><Button variant="light"><MdModeEditOutline style={{ fontSize: 'large', marginRight: '5px' }} /><Link to="/me/update">Edit Profile</Link></Button></p>
                        
                    </div >
                    </div>
            </div>
    
            </>
        )}
        </>
    )
}
export default Profile;



































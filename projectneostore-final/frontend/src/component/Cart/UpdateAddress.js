import React, { Fragment, useEffect ,useState} from "react";
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

import "./Addaddress.css";
import {  useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";


const UpdateAddress = ({history}) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if (isAuthenticated === false) {
        history.push("/login");
      }
    }, [history, isAuthenticated]);
  
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);
  
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    
    const shippingSubmit = (e) => {
          e.preventDefault();
      
          
          dispatch(
            saveShippingInfo({ address, city, state, country, pinCode })
          );
          history.push("/shipping");
        };
  
    return (
        <>
        {loading ? (<Loader />):(
            <>
            <div className="updateaddress" style={{display:"flex",flexWrap:"wrap"}}>
                  <div className="p-4" style={{width:"400px"}}>
                      <h3>My Account</h3>
                      <hr />
                      <div className="myaccountmain">
                          <div style={{ width: '200%'}}>
                              
                              <div className="myaccountsidebar">
                                  <button className='btn w-100' ><HiOutlineMenuAlt2 style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/admin/orders">Orders</Link></button>
                                  <button className="btn w-100" >Account
                                  <button className='btn w-100'><Link to="/account">Profile</Link></button>
                                  <button className='btn w-100'><Link to="/shipping">Address</Link></button>
                                  </button>
                                  
                                      </div>
                          </div>
                          <div style={{ width: '70%' }}>
                            
                          </div>
                      </div>
                  </div>
                  <div className="editaddresss" style={{width:"700px"}}>
                
                  <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                      <h2>Edit address</h2>


                      <div className="shippingContainer">
                  <div className="shippingBox">
                {/* <h2 className="shippingHeading">Shipping Details</h2> */}
              <form
                  className="shippingForm"
                  encType="multipart/form-data"
                  onSubmit={shippingSubmit}
                >
                  <div>
                    <HomeIcon />
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <PinDropIcon />
                    <input
                      type="number"
                      placeholder="Pin Code"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>

                  <div>
                    <LocationCityIcon />
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                

                
                  <div>
                    <PublicIcon />

                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {country && (
                    <div>
                      <TransferWithinAStationIcon />

                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <input
                    type="submit"
                    value="Updated Address"
                    className="shippingBtn"
                    disabled={state ? false : true}
                  />
                </form>
              </div>
            </div>
                      
                      
                  </div >
                  </div>
                  
            </div>
            </>
        )}
        </>
    )
}

export default UpdateAddress

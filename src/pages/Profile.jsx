import React from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';
//import ReactDOM from "react-dom";

function Register() {
  const currentUser = store.getState("currentUser", {default: null});
  const [f_name, setF_name] = useState('');
  const [l_name, setL_name] = useState('');
  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');

  const [street, setStreet] = useState('');
  const [statee, setStatee] = useState('');
  const [post, setPost] = useState('');
  const [country, setCountry] = useState('');
  const [arr, setArr]= useState('');


  const handleProfile = event => {
    event.preventDefault();
    setF_name(currentUser.value.firstname);
    setL_name(currentUser.value.lastname);
    setPhone(currentUser.value.phone_number);
    setEmail(currentUser.value.email);
    console.log(currentUser.value);
  }
    

  return (
    <div onLoad={()=>this.handleProfile()} className="app">   
     <div>
        <Navigation/>     
      </div>
    <div className="profile">
  
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h2">Profile</Typography></center>
                </div>
              </div>
            
    
            <form>
              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Personal Information</Typography>
              </div>

              <p></p>
              
              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{f_name}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{l_name}</Typography>
              </div>

              <p></p>
              
              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{phone}</Typography>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Account Information</Typography>
              </div>
              
              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{email}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{f_name}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">Change Password</Typography>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Address</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{street}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{statee}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{post}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12" variant="h6">{country}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-10">
                    
                  </div>
                  <Buttons className="col-lg-2" variant="contained" color="primary" onClick={handleProfile}>Register</Buttons>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    <div> 
        <Footer/>
      </div>
    </div>
  );
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default Register;
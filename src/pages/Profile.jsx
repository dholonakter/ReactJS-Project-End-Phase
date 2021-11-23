import React, { useState, useEffect } from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import NewNavigation from "../components/NewNavigation";
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';


function Profile() {

  const currentUser = store.getState("currentUser", {default: null});
  const [firstname, setFirstname] = useState('');
  const [l_name, setL_name] = useState('');
  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');

  const [street, setStreet] = useState('');
  const [statee, setStatee] = useState('');
  const [post, setPost] = useState('');
  const [country, setCountry] = useState('');


  function handleProfile(){    
    if(currentUser.value !== null){
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_address="+currentUser.value.address_id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        setStreet(JSON.stringify(response.data.street_name));
        setStatee(JSON.stringify(response.data.state));
        setPost(JSON.stringify(response.data.postal_code));
        setCountry(JSON.stringify(response.data.country));
      });
      setFirstname(currentUser.value.firstname);
      setL_name(currentUser.value.lastname);
      setPhone(currentUser.value.phone_number);
      setEmail(currentUser.value.email_address);
      console.log(currentUser.value);
    }else{
      document.querySelector("#home_nav").click();
    }
  
  }

  useEffect(()=>{
    handleProfile();
  }, [])

  return (
    <div className="app">   
     <div>
        <NewNavigation/>     
      </div>
    <div  className="profile">
  
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-12"><center>
                <Typography className="font-weight-light col-lg-12 text-right" variant="h3">Profile</Typography></center>
                </div>
              </div>
            
    
            <form>
              <div className="row">
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">Personal Information</Typography>
              </div>

              <p></p>
              
              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{firstname}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{l_name}</Typography>
              </div>

              <p></p>
              
              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{phone}</Typography>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">Account Information</Typography>
              </div>
              
              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{email}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">***********</Typography>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">Address</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{street}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{statee}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{post}</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <Typography className="font-weight-light col-lg-12 text-right" variant="h7">{country}</Typography>
              </div>

              <p></p>

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

export default Profile;
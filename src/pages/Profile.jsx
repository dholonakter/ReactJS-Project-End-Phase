import React, { useState, useEffect } from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import Navigation from "../components/Navigation";
import ProfileNavigation from "../components/ProfileNavigation";
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';


function Profile() {  
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [navigation, setNav] = useGlobalState("navigation");
  const user = store.getState("currentUser");

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
    if(user.value != null){
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_address="+user.value.address_id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        setStreet(JSON.stringify(response.data.street_name));
        setStatee(JSON.stringify(response.data.state));
        setPost(JSON.stringify(response.data.postal_code));
        setCountry(JSON.stringify(response.data.country));
      });
      setFirstname(user.value.firstname);
      setL_name(user.value.lastname);
      setPhone(user.value.phone_number);
      setEmail(user.value.email_address);
      console.log(user.value);
    }else{
      document.querySelector("#home_nav").click();
    }
  
  }

  useEffect(()=>{
    handleProfile();
  }, []);

  function setExpiration(){
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    timestamp.setSeconds(timestamp.getSeconds()+1);
    return timestamp;
  }

  const handleLogout = event => {
    event.preventDefault();
    if(user.value !=null){
      let formData = new FormData();
      formData.append('logout_user', 'Signing out');
      formData.append('user_id', user.value.id);
      axios({
        method: 'POST',
        url:'https://i383988.hera.fhict.nl/database.php?',
        data: formData,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
          setNav("/Login");
          setCurrentUser("");
          document.cookie="current_user= ; expires="+ setExpiration().toUTCString();
          alert("Successfully logged out!");
          document.querySelector("#home_nav").click();
      });
    }
  }

  const navigateUpdate = event =>{
    window.location.href="https://i383988.hera.fhict.nl/updateinfo";
  }

  return (
    <div className="app">   
     <div>
        <Navigation/>     
      </div>
    <div  className="profile">
  <div> 
    <ProfileNavigation/>
    </div>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
          
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
              <div className="row">
                  <div className="col-lg-10" style={{margin: 'left'}}>
                      <Buttons className="col-lg-2" variant="contained" color="primary" onClick={navigateUpdate}>Update User</Buttons>
                      <Buttons className="col-lg-2" variant="contained" color="primary" onClick={handleLogout}>Sign out</Buttons>
                  </div>
                
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
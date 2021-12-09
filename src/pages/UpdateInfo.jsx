import React from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import { useState } from "react";
import NewNavigation from "../components/NewNavigation";
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';
import '../css/updateinfo.css';
//import ReactDOM from "react-dom";

function UpdateInfo() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');

  const [street, setStreet] = useState('');
  const [statee, setStatee] = useState('');
  const [post, setPost] = useState('');
  const [country, setCountry] = useState('');

  const [currentType, setType] = useState('');
  const currUser = store.getState("currentUser");


  const updateContact = event => {
    //event.preventDefault();
    let formData = new FormData();
    formData.append('id', currUser.value.id);
    formData.append('update_contact', 'updating contact');
    formData.append('phone',phone);
    formData.append('email',email);

    var valid = 1;
    if(email.includes('@',1) && email.includes('.',2)){}else{
        valid = 0;
        alert("Email address is invalid!");
    }
    
    console.log(currUser.value.id+", "+phone+", "+email);
      if(valid === 1){
        axios({
          method: 'POST',
          url:'https://i383988.hera.fhict.nl/database.php?',
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response);
          console.log('Contact Updated');
          alert("Contact update has been processed");
        })
      }
      else{
        alert("Please enter valid data!");
      }
    }

    const updateAddress = event => {
      //event.preventDefault();
      console.log("does this");
      let formData = new FormData();
      formData.append('update_address', 'updating address');      
      formData.append('id', currUser.value.address_id);
      formData.append('street',street);
      formData.append('statee',statee);
      formData.append('post',post);
      formData.append('country',country);
      if(currUser.value.address_id)
      {
        console.log(currUser.value.address_id);
        axios({
          method: 'POST',
          url:'https://i383988.hera.fhict.nl/database.php?',
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response);
          console.log('Address Updated');
          alert("Address update has been processed");
        })
      }
      else{
        alert("Please enter valid data!");
      }
      }

      const closewindow = event =>{
        console.log(document.getElementById('id01'));
        document.getElementById('id01').style.display='none';
        setType('');
      }

      const updateType = event =>{
        event.preventDefault();
        let formData = new FormData();
        formData.append('id', currUser.value.id);
        formData.append('checkpassword', 'checking password');
        formData.append('password', oldPassword);
        axios({
          method: 'POST',
          url:"https://i383988.hera.fhict.nl/database.php?",
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response.data);
          if(response.data == true){
            if(currentType === "address"){
              updateAddress();
              closewindow();
            }
            else if(currentType === "contact"){
              updateContact();
              closewindow();
            }
            else if(currentType === "password"){
              updatePassword();
              closewindow();
            }
          }
          else{
            alert('Password was incorrect');
          }
        });
     
      }


      const openwindow = type => event => {
        event.preventDefault();
        setType(type);
        document.getElementById('id01').style.display= 'block';
      }
      const updatePassword = event => {
        //event.preventDefault();
        let formData = new FormData();
        formData.append('update_password', 'updating password');
        formData.append('old_password', oldPassword);
        formData.append('user_id', currUser.value.id);
        formData.append('password',password);
        console.log(currUser.value.id);
        var valid = 1;

        if(password.length >= 8 && (new RegExp(/^((([0-9])+([a-z]))|(([a-z])+([0-9])))/, 'i')).test(password)){

          if(password !== c_password){
            valid = 0;
            alert("The new passwords do not match!");
          }
        }else{
          valid = 0;
          alert("Password needs to be at least 8 characters long and contain both letters and numbers");
        }
  
        
    
          if(valid === 1){
            axios({
              method: 'POST',
              url:'https://i383988.hera.fhict.nl/database.php?',
              data: formData,
              config: {headers:{'Content-Type': 'multipart/form-data'}}
            }).then(function(response){
              console.log(response.data);
              alert(response.data);
            })
          }
          else{
            alert("Please enter valid data!");
          }
        }

  const handleSubmit = event => {
    //event.preventDefault();
    let formData = new FormData();
    formData.append('phone',phone);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('oldPassword',oldPassword);
    formData.append('street',street);
    formData.append('statee',statee);
    formData.append('post',post);
    formData.append('country',country);

    var valid = 1;
    if(email.includes('@',1) && email.includes('.',2)){}else{
        valid = 0;
        alert("Email address is invalid!");
    }
      
      if(password.length >= 8 && (new RegExp(/^((([0-9])+([a-z]))|(([a-z])+([0-9])))/, 'i')).test(password)){

        if(password != c_password){
          valid = 0;
          alert("Password and confirm password needs to be the same!");
        }
      }else{
        valid = 0;
        alert("Password needs to be at least 8 characters long and contain both letters and numbers");
      }

      if(valid === 1){
        axios({
          method: 'POST',
          url:'https://i383988.hera.fhict.nl/registerUser/registerUser.php?',
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response);
          console.log('New User Added');
          alert(response);
        })
      }
      else{
        alert("Please enter valid data!");
      }
    }
    

  return (
    <div className="register">
      <div>
        <NewNavigation/>    
      </div> 
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
                <div className="col-lg-1"></div>
                <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h3">Update Information</Typography></center>
                </div>
                
              </div>
            
            
            <p></p>

            <form>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h5">Contact Information</Typography>
              </div>

              <p></p>
              
              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Phone" type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-7"></div>
                  <div className="col-lg-2"></div>
                  <Buttons className="col-lg-3" variant="contained" color="primary" onClick={openwindow("contact")} startIcon={<SaveIcon/>}>Save Contact</Buttons>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-10" variant="h5">Change Password</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Old Password" type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="New Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row"><div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Confirm Password" type="password" name="c_password" value={c_password} onChange={(e) => setCPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-7"></div>
                  <div className="col-lg-2"></div>
                  <Buttons className="col-lg-3" variant="contained" color="primary" onClick={openwindow("password")} startIcon={<SaveIcon/>}>Save Password</Buttons>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h5">Address</Typography>
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Street Name" type="text" name="street_name" value={street} onChange={(e) => setStreet(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="State" type="text" name="statee" value={statee} onChange={(e) => setStatee(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Post Code" type="text" name="post" value={post} onChange={(e) => setPost(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="Country" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-6"></div>
                  <Buttons className="col-lg-2" variant="contained" color="secondary" onClick={handleSubmit} startIcon={<Cancel/>}>Cancel</Buttons>
                  <div className="col-lg-1"></div>
                  <Buttons className="col-lg-3" variant="contained" color="primary" onClick={openwindow("address")} startIcon={<SaveIcon/>}>Save Address</Buttons>
              </div>
              

            </form>


          </div>     
           <div id="id01" class="modal">
      <span onClick={closewindow} class="close" title="Close Modal">&times;</span>
      <form class="modal-content" action="/action_page.php">
        <div class="container">
          <h2>Update Profile</h2>
          <div className="row">
                <div className="col-lg-1"></div>
                <label>Password</label>
                  <TextFields required
                  className="col-lg-7" variant="outlined" label="password" type="password" name="post" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                  />
              </div>
        <div class="clearfix">
        <Buttons id='updatebtn' className="col-lg-4" variant="contained" color="primary"onClick={updateType}>Update</Buttons>
        <Buttons className="col-lg-4" variant="contained" color="primary" onClick={closewindow}>Cancle</Buttons>
        </div>
    </div>
  </form>
  </div>
        </div>
      <Footer />    
      </div>

  </div>
  );
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default UpdateInfo;
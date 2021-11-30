import React from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import { useState } from "react";
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
  const [arr, setArr]= useState('');


  const updateContact = event => {
    //event.preventDefault();
    let formData = new FormData();
    setArr({"phone":phone,"email":email});
    formData.append('phone',phone);
    formData.append('email',email);

    var valid = 1;
    if(email.includes('@',1) && email.includes('.',2)){}else{
        valid = 0;
        alert("Email address is invalid!");
    }
    

      if(valid == 1){
        axios({
          method: 'POST',
          url:'https://i383988.hera.fhict.nl/updateUserInfo/updateContact.php?',
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
      let formData = new FormData();
      setArr({"street":street,"statee":statee,"post":post,"country":country});
      formData.append('street',street);
      formData.append('statee',statee);
      formData.append('post',post);
      formData.append('country',country);
  
      var valid = 1;
  
        if(valid == 1){
          axios({
            method: 'POST',
            url:'https://i383988.hera.fhict.nl/updateUserInfo/updateAddress.php?',
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

      const updatePassword = event => {
        //event.preventDefault();
        let formData = new FormData();
        setArr({"oldPassword":oldPassword,"password":password});
        formData.append('password',password);
        formData.append('oldPassword',oldPassword);
    
        var valid = 1;

        if(password.length >= 8 && (new RegExp(/^((([0-9])+([a-z]))|(([a-z])+([0-9])))/, 'i')).test(password)){

          if(password != c_password){
            valid = 0;
            alert("Password and confirm password needs to be the same!");
          }
        }else{
          valid = 0;
          alert("Password needs to be at least 8 characters long and contain both letters and numbers");
        }
  
        
    
          if(valid == 1){
            axios({
              method: 'POST',
              url:'https://i383988.hera.fhict.nl/updateUserInfo/updatePassword.php?',
              data: formData,
              config: {headers:{'Content-Type': 'multipart/form-data'}}
            }).then(function(response){
              console.log(response);
              alert("Password update has been processed");
            })
          }
          else{
            alert("Please enter valid data!");
          }
        }

  const handleSubmit = event => {
    //event.preventDefault();
    let formData = new FormData();
    setArr({"phone":phone,"email":email,"oldPassword":oldPassword,"password":password,"street":street,"statee":statee,"post":post,"country":country});
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

      if(valid == 1){
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
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
                <div className="col-lg-1"></div>
                <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h2">Update Information</Typography></center>
                </div>
                
              </div>
            
            
            <p></p>

            <form>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Contact Information</Typography>
              </div>

              <p></p>
              
              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Phone" type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-7"></div>
                  <div className="col-lg-2"></div>
                  <Buttons className="col-lg-3" variant="contained" color="primary" onClick={updateContact} startIcon={<SaveIcon/>}>Save Contact</Buttons>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Change Password</Typography>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Old Password" type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="New Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row"><div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Confirm Password" type="password" name="c_password" value={c_password} onChange={(e) => setCPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-7"></div>
                  <div className="col-lg-2"></div>
                  <Buttons className="col-lg-3" variant="contained" color="primary" onClick={updatePassword} startIcon={<SaveIcon/>}>Save Password</Buttons>
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Address</Typography>
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Street Name" type="text" name="street_name" value={street} onChange={(e) => setStreet(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="State" type="text" name="statee" value={statee} onChange={(e) => setStatee(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Post COde" type="text" name="post" value={post} onChange={(e) => setPost(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Country" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-6"></div>
                  <Buttons className="col-lg-2" variant="contained" color="secondary" onClick={handleSubmit} startIcon={<Cancel/>}>Cancel</Buttons>
                  <div className="col-lg-1"></div>
                  <Buttons className="col-lg-3" variant="contained" color="primary" onClick={updateAddress} startIcon={<SaveIcon/>}>Save Address</Buttons>
              </div>
              

            </form>


          </div>
        </div>
      </div>
    </div>
  );
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default UpdateInfo;
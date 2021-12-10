import React from "react";
import axios from 'axios';
//import {Button} from '@material-ui/core';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import { useState } from "react";
import NewNavigation from "../components/NewNavigation";
import Footer from "../components/Footer"
//import ReactDOM from "react-dom";

function Register() {
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


  const handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    setArr({"f_name":f_name,"l_name":l_name,"phone":phone,"email":email,"password":password,"street":street,"statee":statee,"post":post,"country":country});
    console.log(f_name + ", "+ l_name + ", "+ phone + ", "+ email + ", "+ password + ", "+ street + ", "+ statee + ", "+ post + ", "+ country);
    formData.append('register_user', "registering");
    formData.append('f_name', f_name);
    formData.append('l_name',l_name);
    formData.append('phone',phone);
    formData.append('email',email);
    formData.append('password',password);
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

        if(password !== c_password){
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
          url:'https://i383988.hera.fhict.nl/database.php?',
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response);
          console.log('New User Added');
          alert("Registration Completed!");
        })
      }
      else{
        alert("Please enter valid data!");
      }
    }
    

  return (
    <div className="app">   
     <div>
        <NewNavigation/>    
      </div>
    <div className="register">
  
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h2">Register</Typography></center>
                </div>
              </div>
            
            
            <p></p>

            {/* <form onSubmit={handleSubmit}> */}
            <form>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Personal Information</Typography>
                {/* <h2 className="font-weight-light col-lg-12">Personal Information</h2> */}
              </div>

              <p></p>
              
              <div className="row">
                  {/* <div className="col-lg-4" variant="h5">
                    <Typography>
                      First Name:
                    </Typography>
                  </div> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" type="text" name="f_name" label="First Name" value={f_name} variant="outlined"
                  onChange={(e) => setF_name(e.target.value)}
                  />
                  {/* <input className="col-lg-8" type="text" name="f_name" value={f_name} onChange={(e) => setF_name(e.target.value)}/> */}
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Last Name:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="text" name="l_name" value={l_name} onChange={(e) => setL_name(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Last Name" type="text" name="l_name" value={l_name} onChange={(e) => setL_name(e.target.value)}
                  />
              </div>

              <p></p>
              
              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Phone Number:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Phone" type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Account Information</Typography>
                {/* <h2 className="font-weight-light col-lg-12">Account Information</h2> */}
              </div>
              
              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Email:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Password:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Confirm Password:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="password" name="c_password" value={c_password} onChange={(e) => setCPassword(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Confirm Password" type="password" name="c_password" value={c_password} onChange={(e) => setCPassword(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Address</Typography>
                {/* <h2 className="font-weight-light col-lg-12">Address</h2> */}
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Street Name:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="text" name="street_name" value={street} onChange={(e) => setStreet(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Street Name" type="text" name="street_name" value={street} onChange={(e) => setStreet(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      State:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="text" name="statee" value={statee} onChange={(e) => setStatee(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="State" type="text" name="statee" value={statee} onChange={(e) => setStatee(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Postal Code:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="text" name="post" value={post} onChange={(e) => setPost(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Post Code" type="text" name="post" value={post} onChange={(e) => setPost(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  {/* <div className="col-lg-4">
                    <Typography>
                      Country:
                    </Typography>
                  </div>
                  <input className="col-lg-8" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}/> */}
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Country" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-10">
                    
                  </div>
                  {/* <button className="button col-lg-2 btn-primary btn-block" onClick={handleSubmit}>button</button> */}
                  <Buttons className="col-lg-2" variant="contained" color="primary" onClick={handleSubmit}>Register</Buttons>
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
import React, {useState}  from "react";
import axios from 'axios';
import TextFields from '@material-ui/core/TextField';
import {store, useGlobalState} from 'state-pool';
import Buttons from '@material-ui/core/Button';
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

store.setState("currentUser", null);

function Login() {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = event => {
    event.preventDefault();    
    let formData = new FormData();
    formData.append('login_user', 'logging in');
    formData.append('email', email);
    formData.append('password', password);
    axios({
      method: 'POST',
      url:'https://i383988.hera.fhict.nl/database.php?',
      data: formData,
      config: {headers:{'Content-Type': 'multipart/form-data'}}
    }).then(function(response){
      if(response.data.id){
        console.log(response.data);
        setCurrentUser(response.data);
        alert("Login Successful");
      }else{
        alert("Incorrect email or password");
      }
    })
  }

  return (
    <div className="login">
        <div>
        <Navigation/>    
      </div>
      <div className="container">
        <div className="row align-items-center my-5">
          
          <div className="col-lg-5">
            <h1 className="font-weight-light">Login</h1>

           <form>
                <div className="form-group">
                    <label>Email address</label>
                    <TextFields required
                  className="col-lg-11" variant="outlined" label="Email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <TextFields required
                  className="col-lg-11" variant="outlined" label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <Buttons className="col-lg-2" variant="contained" color="primary" onClick={handleLogin}>Submit</Buttons>
                <p className="forgot-password text-right">
                    Forgot <a href="/">password?</a>
                </p>
            </form>
          </div>
        </div>
      </div>
      <div> 
        <Footer/>
      </div>
    </div>
  );
}

export default Login;
import React, { useState, useEffect }from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import emailjs from '@emailjs/browser';
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';
import Navigation from "../components/Navigation";
import {
  Typography,
  TextField,
  Button,
  Slider, 
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

function ForgotPassword(){
  const [email, setEmail] = useState("");
  const [firstname, setName] = useState("");
  const [reset_code, setCode] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const [verify_code, setVerifyCode ] = useState("");
  
  const handleEmail = event =>{ 
    event.preventDefault();
    axios({
      method: "GET",
      url:
        "https://i383988.hera.fhict.nl/database.php?user_email=" + email,
        config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (response) {
      if(response.data)
      {
        setName(response.data.firstname);  
        setId(response.data.id);
        if(response.data.reset_expiry>getDateTime(0)){
          console.log("response = "+response.data.reset_code);
          setVerifyCode(response.data.reset_code);
        }
        else
        {
          var verifyCode =Math.floor(Math.random() * 90000 + 10000);
          setVerifyCode(verifyCode);
          let formData = new FormData();
          formData.append("reset_password","reset_password");
          formData.append("expiry", getDateTime(6));
          formData.append("email", email);
          formData.append("code", verifyCode);    
          axios({
            method: "POST",
            url:"https://i383988.hera.fhict.nl/database.php?",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
          }).then(function (response) {
        
          });
        }
        emailjs.sendForm('FHICTrade', 'template_vrssqxs', document.getElementById('emailform'), 'user_b31w8k3qqpnrvKmaehrJK')
        .then((result) => {
          console.log(result.text);
          alert("A verification code has been sent to the email provided.");
          codeForm();
        }, (error) => {
            console.log(error.text);
        });  
      }
      else{
        alert("Please enter a valid email address.");
      }
    });
}
  const handlePassword = event =>{ 
      event.preventDefault();
      var valid = 1;
      if (
        password.length >= 8 &&
        new RegExp(/^((([0-9])+([a-z]))|(([a-z])+([0-9])))/, "i").test(password)
      ) {
        if (password !== c_password) {
          valid = 0;
          alert("Password and confirm password needs to be the same!");
        }
      } else {
        valid = 0;
        alert(
          "Password needs to be at least 8 characters long and contain both letters and numbers"
        );
      }
      if(valid == 1){
        let formData = new FormData();
        formData.append("edit_password", "edit_password");
        formData.append("password", password);
        formData.append("email", email);
        formData.append("id", id);
        axios({
          method: "POST",
          url:"https://i383988.hera.fhict.nl/database.php?",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        }).then(function (response) {
          let newData = new FormData();
          newData.append("email", email);
          newData.append("clear_forgotpassword", "clear_forgotpassword");
          newData.append("null", null);
          newData.append("now", getDateTime(0));
          alert("Password has successfully been updated.");
          axios({
            method: "POST",
            url:"https://i383988.hera.fhict.nl/database.php?",
            data: newData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
          }).then(function (response) {
            window.location.href = "https://i383988.hera.fhict.nl/Login";
          });
      });
      }
      
  }
  const verifyCode = event =>{
    event.preventDefault(); 
    console.log(verify_code);
    console.log(reset_code);
    axios({
      method: "GET",
      url:"https://i383988.hera.fhict.nl/database.php?user_email="+email,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (response) {
      if(response.data.reset_code === reset_code)
      {
        passwordresetForm();
      }
    });
  }

  const passwordresetForm = event =>{
    document.getElementById("codeform").style.display = "none";
    document.getElementById("resetform").style.display = "table-cell";
    document.getElementById("emailform").style.display = "none";
  }
  const codeForm = event =>{
    document.getElementById("codeform").style.display = "table-cell";
    document.getElementById("resetform").style.display = "none";
    document.getElementById("emailform").style.display = "none";
  }
  function getDateTime(time){
    var date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + (date.getUTCHours()+time)).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
    return date;
  }

  return (
    <div className="resetpassword" style={{height: "100vh",backgroundColor:"#F6F6F6"}}>    
    <div>
      <Navigation />
    </div>
    <div id='form-content' style={{position: "relative",display:"table", backgroundColor:"white",margin:"auto",top:"10vh", height:"350px", width:"350px"}}>
      <form id='emailform' onSubmit={handleEmail} style={{display:"table-cell",height:"300px", width: "300px",position: "relative",top:"50px",margin:"auto", textAlign:"middle"}}>
        <Typography className="font-weight-medium col-lg-12 text-left pb-3" variant="h5">
          Forgot Password
        </Typography>
        <Typography className="font-weight-light col-lg-12 text-left" variant="h7">
          Enter your email
        </Typography>
          <input type="text" name="to_email" value={email} style={{float:"center",display:"block", margin:"auto", width:"90%"}}onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" name="to_name" value={firstname} style={{display: "none"}}/>
          <input type="text" name="reset_code" value={verify_code} style={{display: "none"}}/>  
          <Button variant="contained" style={{margin:"auto", top:"20px",width:"90%", display:"block"}}color="primary" onClick={handleEmail}>Submit</Button>
        </form>
        <form id='codeform' style={{display:"none",height:"300px", width: "300px",position: "relative",top:"50px",margin:"auto", textAlign:"middle"}}>
          <Typography className="font-weight-medium col-lg-12 text-left pb-3" variant="h5">
            Enter your validation code
          </Typography>
          <Typography className="font-weight-light col-lg-12 text-left" variant="h7">
            Validation code
          </Typography>
            <input type="text" name="reset_code" value={reset_code} style={{float:"center",display:"block", margin:"auto", width:"90%"}}onChange={(e) => setCode(e.target.value)}/>
            <Button variant="contained" style={{margin:"auto", top:"20px",width:"90%", display:"block"}} color="primary" onClick={verifyCode}>Verify</Button>
        </form>
        <form id='resetform' style={{display:"none",height:"300px", width: "300px",position: "relative",top:"50px",margin:"auto", textAlign:"middle"}}>
          <Typography className="font-weight-medium col-lg-12 text-left pb-3" variant="h5">
            Set your new password
          </Typography>
          <Typography className="font-weight-light col-lg-12 text-left" variant="h7">
            New password
          </Typography>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{float:"center",display:"block", margin:"auto", width:"90%"}}/>
            <Typography className="font-weight-light col-lg-12 text-left" variant="h7">
            Confirm password
          </Typography>
            <input type="password" name="new_password" value={c_password} onChange={(e) => setCPassword(e.target.value)} style={{float:"center",display:"block", margin:"auto", width:"90%"}}/>
            <Button  variant="contained" style={{margin:"auto", top:"20px",width:"90%", display:"block"}} color="primary" onClick={handlePassword}>Send</Button>
          </form>
      </div>  
    <div style={{position:"fixed", bottom:"0", width: "100%"}}>

      <Footer />

    </div>
    </div>      
  );
}

export default ForgotPassword;
import React, { useState, useEffect }from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import emailjs from '@emailjs/browser';
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


  const handleEmail = event =>{ 
      event.preventDefault();
      axios({
        method: "GET",
        url:
          "https://i383988.hera.fhict.nl/database.php?user_email=" + email,
          config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
        console.log(response);
        setName(response.data.firstname); 
        emailjs.sendForm('FHICTrade', 'template_vrssqxs', document.getElementById('form'), 'user_b31w8k3qqpnrvKmaehrJK')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      });
     
  }

   
  return (
    <div className="resetpassword">
      <form id='form' onSubmit={handleEmail}>
      <Typography className="font-weight-light col-lg-12 text-right pb-4" variant="h4">
        Reset Password
      </Typography>
      <Typography className="font-weight-light col-lg-12 text-right pb-4" variant="h5">
        Email:
      </Typography>
      <input type="text" name="to_email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="text" name="to_name" value={firstname} style={{display: "none"}}/>
      <input type="text" name="reset_code" value="123"style={{display: "none"}}/>
      </form>
      <Button className="col-lg-2" variant="contained" color="primary" onClick={handleEmail}>Send</Button>
    </div>
  );
}

export default ForgotPassword;
import React from "react";
import ReactDOM from "react-dom";
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

function Verification(){

  const handleEmail = event =>{ 
      event.preventDefault();
      emailjs.sendForm('FHICTrade', 'template_wem051o', document.getElementById('form'), 'user_b31w8k3qqpnrvKmaehrJK')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
   
  return (
    <div className="verification">
      <form id='form' onSubmit={handleEmail}>
        <input type="text" name="to_email" value="cheesesien@gmail.com"style={{display: "none"}}/>
        <input type="text" name="to_name" value="Ian"style={{display: "none"}}/>
        <input type="text" name="verification_code" value="123"style={{display: "none"}}/>
      </form>
      <Button
      className="col-lg-2"
      variant="contained"
      color="primary"
      onClick={handleEmail}
      >Send</Button>
    </div>
  );
}

export default Verification;
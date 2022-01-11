import React from "react";
import ReactDOM from "react-dom";
import emailjs from '@emailjs/browser';

import axios from "axios";
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
const openWindow = event =>{
  event.preventDefault();
  window.open('https://i383988.hera.fhict.nl/register','popUpWindow','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
}

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
        <input type="text" name="to_email" value="c@gmail.com"style={{display: "none"}}/>
        <input type="text" name="to_name" value=""style={{display: "none"}}/>
        <input type="text" name="verification_code" value="123"style={{display: "none"}}/>
      </form>
      <Button
      className="col-lg-2"
      variant="contained"
      color="primary"
      onClick={handleEmail}
      >Send</Button>
        <Button
      className="col-lg-2"
      variant="contained"
      color="primary"
      onClick={openWindow}
      >window</Button>
    </div>
    
  );
}

export default Verification;
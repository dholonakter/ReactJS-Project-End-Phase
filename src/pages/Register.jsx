import React from "react";
import axios from 'axios'
import { useEffect, useState, } from "react";
import ReactDOM from "react-dom";
import { findByPlaceholderText } from "@testing-library/dom";

function Register(){
  const [f_name, setF_name] = useState('');
  const [l_name, setL_name] = useState('');
  const [e_mail, setE_mail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [phone_number, setP_number] = useState('');
  const [address_id, setAddress] = useState('');
  const[arr, setArr]= useState('');
  const [home, setHome]= useState('');
  const[userArr, setUser] = useState([]);
  const users = [];
  const [firstname, setFirstname]=useState('');
  const handleChange = (e) => { 
    const varr = {};
    console.log(varr);
  }

const handleGet = event => {
  event.preventDefault();
  axios({
    method: 'GET',
    url:'https://i383988.hera.fhict.nl/database.php?get=user', //
    config: {headers:{'Content-Type': 'multipart/form-data'}}
  }).then(function(response){
    let arruser =  [];
    if (response.data.error) {
      console.log("error");
      setHome("error lol");
    } else {
      arruser.push(response.data);
      setUser(arruser);
      console.log(response.data);
    }})
 }
 const Get = event => {
  event.preventDefault();
  axios({
    method: 'GET',
    url:'https://i383988.hera.fhict.nl/database.php?get=user', //
    config: {headers:{'Content-Type': 'multipart/form-data'}}
  }).then(response => response.data).then((data) =>{
     for(let i = 0; i<data.length; i++){
         users.push(data[i]);
     }
     console.log("data ="+ data);
     console.log("data2 ="+ users);
     console.log("data3 ="+ JSON.stringify(users[0]));
     console.log("data4 ="+ JSON.stringify(users[0].firstname));
     setFirstname(JSON.stringify(users[0].firstname));
  })
 }
  const handleSubmit = event => {
   event.preventDefault();

   let formData = new FormData();
   setArr({"f_name":f_name,"l_name":l_name,"e_mail":e_mail,"password":password,"phone_number":phone_number,"address_id":address_id});
   formData.append('f_name', f_name);
   formData.append('l_name',l_name);
   console.log(f_name + l_name);
   axios({
     method: 'POST',
     url:'https://i383988.hera.fhict.nl/database.php?',
     data: formData,
     config: {headers:{'Content-Type': 'multipart/form-data'}}
   }).then(function(response){
     console.log('Tried get');
   })
  }
  return (
    <div className="register">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-4"></div>
                <h1 className="font-weight-light col-lg-4"><center>Register</center></h1>
              </div>
            <form>
              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      First Name:
                    </label>
                  </div>
                  <input className="col-lg-8" id="f_name" type="text" name="f_name" value={f_name} onChange={(e) => setF_name(e.target.value)}/>
              </div>
              <p></p>
              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Last Name:
                    </label>
                  </div>
                  <input className="col-lg-8" id="l_name" type="text" name="l_name" value={l_name} onChange={(e) => setL_name(e.target.value)}/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Email:
                    </label>
                  </div>
                  <input className="col-lg-8" id="email" type="text" name="email"value={e_mail} onChange={(e) => setE_mail(e.target.value)}/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Password:
                    </label>
                  </div>
                  <input className="col-lg-8" id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Confirm Password:
                    </label>
                  </div>
                  <input className="col-lg-8" id="c_password" type="password" name="c_password" value={c_password} onChange={(e) => setC_password(e.target.value)}/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Street Name:
                    </label>
                  </div>
                  <input className="col-lg-8" type="text" name="street_name"/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      State:
                    </label>
                  </div>
                  <input className="col-lg-8" type="text" name="state"/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Postal Code:
                    </label>
                  </div>
                  <input className="col-lg-8" type="text" name="post"/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Country:
                    </label>
                  </div>
                  <input className="col-lg-8" type="text" name="country"/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-4">
                    <label>
                      Phone Number:
                    </label>
                  </div>
                  <input className="col-lg-8" type="number" name="phone" value={phone_number} onChange={(e) => setP_number(e.target.value)}/>
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-10">
                    
                  </div>
                  <input className="col-lg-2" type="submit" onClick={handleSubmit} value="Submit" />
                  <input className="col-lg-2" type="submit" onClick={Get} value="Get" />
              </div>
              {firstname}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default Register;
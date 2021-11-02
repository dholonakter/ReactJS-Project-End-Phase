import React from "react";

import { useState } from "react";
import ReactDOM from "react-dom";

function Register() {
  const [inputs, setInputs] = useState('');

  const handleChange = (e) => {
    alert(inputs);
    const varr = {inputs};
    console.log(varr);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    
    

    // fetch('http://localhost:3000/blogs/', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog)
    // }).then(() => {
    //   console.log('new blog added');
    // })
  }

  return (
    <div className="register">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-2">
            
          </div>
          <div class="col-lg-8">
            
              <div class="row">
                
                <div class="col-lg-4"></div>
                <h1 class="font-weight-light col-lg-4"><center>Register</center></h1>
              </div>
            
            
            <p>{ inputs }</p>

            <form>
              
              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      First Name:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="f_name" value={inputs} onChange={(e) => setInputs(e.target.value)}/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Last Name:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="l_name" onChange={handleChange}/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Email:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="email"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Password:
                    </label>
                  </div>
                  <input class="col-lg-8" type="password" name="password"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Confirm Password:
                    </label>
                  </div>
                  <input class="col-lg-8" type="password" name="c_password"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Street Name:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="street_name"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      State:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="state"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Postal Code:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="post"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Country:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="country"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Phone Number:
                    </label>
                  </div>
                  <input class="col-lg-8" type="number" name="phone"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-10">
                    
                  </div>
                  <input class="col-lg-2" type="submit" value="Submit" />
              
              </div>

            </form>


          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Register />, document.getElementById('root'));

export default Register;
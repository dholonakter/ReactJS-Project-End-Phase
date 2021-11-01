import React from "react";

function Register() {
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
            
            
            <p></p>
            <p></p>
            <p></p>

            <form>
              
              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Name:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="name"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Email:
                    </label>
                  </div>
                  <input class="col-lg-8" type="text" name="name"/>
              </div>

              <p></p>

              <div class="row">
                  <div class="col-lg-4">
                    <label>
                      Phone Number:
                    </label>
                  </div>
                  <input class="col-lg-8" type="number" name="name"/>
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

export default Register;
import React from "react";
import NewNavigation from "../components/NewNavigation"
import Footer from "../components/Footer"

function About() {
  return (
    <div className="about">
        <div>
        <NewNavigation/>    
      </div>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">About</h1>
            <p>
              FHICT is an online marketplace where fontys students can buy and
              sell new and second-hand products which are used for educational
              purposes. Products like notes, books and bikes are often hard to 
              get rid and at the same time highly demanded by students. 
              
              We hope to make this trade connection between students easier
              with the use of our website FHICTrade.
            </p>
          </div>
        </div>
      </div>
      <div> 
        <Footer/>
      </div>
    </div>  
    
  );
}

export default About;
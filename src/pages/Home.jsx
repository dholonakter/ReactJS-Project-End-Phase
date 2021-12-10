import React from "react";
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import {store, useGlobalState} from 'state-pool';

function Home() {
  return (
    <div className="home">
	  <div>
        <Navigation/>    
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
            <h1 className="font-weight-light">Home</h1>
    
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
			<Footer/>
          </div>
        </div>
      </div>
    </div>	
  );
}
export default Home;


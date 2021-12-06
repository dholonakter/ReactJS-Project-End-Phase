import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Typography, TextField, Button, Slider, Checkbox, FormGroup, FormControlLabel} from '@material-ui/core';

import NewNavigation from "../components/NewNavigation"
import Footer from "../components/Footer"

function SingleProductPage({item}){
return(

<div class="product">
<div>
        <NewNavigation/>    
    </div> 
 <header>
   <hgroup>
     {/* <h1>{item.title}</h1> */}
     <h1>Bikes</h1>
   </hgroup>
 </header>

 <figure>
   <img src="https://assets.hongkiat.com/uploads/html5-single-product-page/iphone4s-3d.png"/>
 </figure>

 <section>

 <p>The faster dual-core A5 chip. The 8MP camera with all-new optics also shoots 1080p HD video. And introducing Siri. It's the most amazing iPhone yet.</p>

 <details>
  <summary>Product Features</summary>
     <ul>
       <li>8 mega pixel camera with full 1080p video recording</li>
       <li>Siri voice assitant</li>
       <li>iCloud</li>
       <li>Air Print</li>
       <li>Retina display</li>
       <li>Photo and video geotagging</li>
     </ul>
 </details>

 <button>Buy Now</button>
 <button>Message  seller</button>
 </section>
<div><Footer/></div>
</div>

)}

export default SingleProductPage;
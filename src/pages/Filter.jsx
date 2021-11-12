import React from "react";
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import ProductFilter from "../components/ProductFilter"

function Filter() {
	let productFilter = new ProductFilter();
	let productList = productFilter.getList();
	let filteredList = productFilter.sortList("PRICE", 40);
	console.log(productList);
	console.log(filteredList);
  return (
  
    <div className="filter">
	  <div>
        <Navigation/>    
      </div>
      <div className="container">  
      <form>
        <label>
          Is going:
          <input name="isGoing" type="checkbox"  />
        </label>
        <br />
  <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />

      </form>	  
			<Footer/>          
        </div>
    </div>	
  );
}
export default Filter;


import React from "react";
import axios from "axios";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductsRow from "../components/ProductsRow";
import Navigation from "../components/Navigation";

class Home extends React.Component {
	
	constructor(props) {
    super(props);
    this.state = {
      products: [],
	  tempData: [
    {
      id: -1,
      title: "No products of this category found",
    },    
  ],

    };
  }

  componentDidMount() {
    const url = "https://i383988.hera.fhict.nl/database.php?search_product";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
		   console.log("hello");
        this.setState({ products: data });
      });
  }
  
  // ID 1 = books, 2 = accessories, 3 = bikes, 4 = other
  getProductsByCategory(category_id){
	  let filteredProductList = [];
	  let index = 0;
	  const productDisplayLimit = 4;
	  
	 for(let product of this.state.products){
		 if(index != productDisplayLimit){
			 if (product.category_id == category_id){
			  filteredProductList.push(product);
			  index++;
		    }
		 }		  
	    }		
		
	  if(filteredProductList.length == 0){
			filteredProductList =  this.state.tempData;
		}
	  
	  return filteredProductList;
  }
  
  
  render() {
  return (
    <div className="home">
      <Navigation />
      <Banner />
	  <ProductsRow sectionTitle="Books" data={this.getProductsByCategory(1)} />
      <ProductsRow sectionTitle="Accessories" data={this.getProductsByCategory(2)} />
      <ProductsRow sectionTitle="Bikes" data={this.getProductsByCategory(3)} />
	  <ProductsRow sectionTitle="Other" data={this.getProductsByCategory(4)} />
      <Footer />
    </div>
  );
  }
}
export default Home;

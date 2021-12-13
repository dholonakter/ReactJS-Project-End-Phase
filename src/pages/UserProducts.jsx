import React, { useState, useEffect } from "react";
import ReactDOM, { render } from 'react-dom';
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import Navigation from "../components/Navigation";
import ProfileNavigation from "../components/ProfileNavigation";
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';
import Table from 'react-bootstrap/Table';


class UserProducts extends React.Component {  
  constructor(props){
    super(props);
    this.state = {
      currentUser: store.getState("currentUser"),
      products: [],
      loaded: false,
      categories: [
        {
          id: 1,
          label: "Books",
        },
            {
          id: 2,
          label: "Accessories",
        },		
        {
          id: 3,
          label: "Bicycles",
        },		
        ],
    };
  }

  componentDidMount(){
    this.handleProducts();
  }
  shouldComponentUpdate(){
    if(this.state.loaded == false){   
      return true;
      }
    else{
      return false;
    }
  }
  componentDidUpdate(){
    this.handleProducts();
  }

handleProducts(){
  const that = this;
    if(this.state.currentUser.value != null){
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_user_products="+this.state.currentUser.value.id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        that.setState({products: response.data});
        that.setState({loaded: true});
        
      });
    }
}
handleCategory(id){
  axios({
    method: 'GET',
    url:"https://i383988.hera.fhict.nl/database.php?get_category="+id,
    config: {headers:{'Content-Type': 'multipart/form-data'}}
  }).then(function(response){
    return id;
  });
}
// getCategory(id){
//   var result;
//   axios({
//     method: 'GET',
//     url:"https://i383988.hera.fhict.nl/database.php?get_category="+id,
//     config: {headers:{'Content-Type': 'multipart/form-data'}}
//   }).then(function(response){
//    result = response.data;
//   });
//   return result;
// }

render(){
  return (
    <div className="app">   
     <div>
        <Navigation/>     
      </div>
    <div  className="userproduct">
      <div> 
      <ProfileNavigation/>
      </div>
      <div className="container">
        <div className="row align-items-center my-5">
       
          <div className="col-lg-12">
            
              <div className="row">
                
              <div className="col-lg-12"><center>
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">My Products</Typography></center>
                </div>
              </div>
              <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Product Price</th>
                  <th>Product Category</th>
                </tr>
              </thead>
              <tbody>
               {
               this.state.products.map(product => {
                 return(
                  <tr>
                    <td></td>
                    <td>{product.product_name}</td>
                    <td>{product.product_description}</td>
                    <td>{product.product_price}</td>
                    <td>{product.category_id}</td>
                  </tr>
                 );
              })} 
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
    <div> 
        <Footer/>
      </div>
    </div>
  );
}
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default UserProducts;
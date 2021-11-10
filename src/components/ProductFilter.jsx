import React from "react";
import { Link, withRouter } from "react-router-dom";
import Product from "./Product";

class ProductFilter{
	
	constructor(){
		this.productList = [];
		this.createProduct(1, 1, 1, "A book", 35, 1);
		this.createProduct(2, 2, 2, "A 2nd book", 59.95, 2);
		
	}
	
	createProduct(id, userid, prodid, proddesc, price, catid){
		let prod = new Product(id, userid, prodid, proddesc, price, catid);
        this.productList.push(prod);
	}
	
	getList(){
		return this.productList;	
	}
	sortList(filterType, value){
		let filteredList = [];
		if(filterType == "CATEGORY"){
			for( let product of this.productList) {
				if(product.category_id == value){
					filteredList.push(product);
				}
			}
			
		}
		return filteredList;
	}
	
}
export default ProductFilter;
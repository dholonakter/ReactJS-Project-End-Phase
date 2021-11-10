import React from "react";
import { Link, withRouter } from "react-router-dom";

class Product{
	
	constructor(id, userid, prodid, proddesc, price, catid){
		this.id = id
		this.user_id = userid;
		this.product_id = prodid;
		this.product_description = proddesc;
		this.product_price = price;
		this.category_id = catid;
	}
}
export default Product;
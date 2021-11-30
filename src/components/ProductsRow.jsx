/*import React from 'react'
import bikeImage from '../assests/images/bike.jpg'

function ProductsRow({ sectionTitle, data }) {
    return (
        <div className="container py-5">
            <h4>{sectionTitle}</h4>
            <div className="row">
                {data.map((item, idx) => (
                    <div className="col-md-3" key={idx}>
                        <div class="card" >
                            <img src={item.img} class="card-img-top p-3" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title ">{item.title}</h5>
                                <p class="card-text">{item.description}</p>
                                <p className="fw-bold py-2">$ {item.price}</p>
                                <a href="#" class="btn btn-success">Add to cart</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default ProductsRow*/

import React from 'react'

function ProductsRow({ sectionTitle, data }) {	
    return (
        <div className="container py-5">
            <h4>{sectionTitle}</h4>
            <div className="row">
                {data.map((item, idx) => (
                    <div className="col-md-3" key={idx}>
                        <div className="card" >
                            <img src={process.env.PUBLIC_URL + '/images/' + item.img_name + '.jpg'} className="card-img-top p-3" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title ">{item.title}</h5>
                                <p className="card-text">{item.product_description}</p>
                                <p className="fw-bold py-2">€ {item.product_price}</p>
                                <a href="#" className="btn btn-success">Add to cart</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default ProductsRow

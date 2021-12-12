import React from 'react'

function ProductsRow({ sectionTitle, data }) {	
    return (
        <div className="container py-5">
            <h4>{sectionTitle}</h4>
            <div className="row">
                {data.map((item, idx) => (
                    <div className="col-md-3" key={idx}>
                        <div className="card" >
                            <img style={{height: "250px"}} src={`data:image/png;base64,${item.product_image}`} className="card-img-top p-3" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title ">{item.product_name}</h5>                                
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
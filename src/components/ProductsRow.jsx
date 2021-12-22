import Typography from "material-ui/styles/typography";
import React from "react";

function ProductsRow({ sectionTitle, data }) {
  let trimString = function (string, length) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  };

  return (
    <div className="container py-5">
      <h4>{sectionTitle}</h4>
      <div className="row">
        {data.map((item, idx) => (
          <div className="col-sm-12 col-md-6 col-lg-3" key={idx}>
            <div className="card mb-3">
              <img
                src={
                  `data:image/png;base64,${item.product_image}`
                }
                style={{
                  maxHeight: "230px",
                  width: "100%",
                  objectFit: "contain",
                }}
                className="card-img-top p-3"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title ">{item.title}</h5>
                <p className="card-text">
                  {item.product_description
                    ? trimString(item.product_description, 20)
                    : "Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
                </p>
                <p className="fw-bold py-2">€ {item.product_price}</p>
                <a href="#" className="btn btn-success btn-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsRow;
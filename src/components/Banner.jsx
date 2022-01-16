import React from "react";
import { useMediaQuery } from "@mui/material";

function Banner() {
  const matchesMd = useMediaQuery("(max-width:768px)");
  return (
    <div className="container">
      <img
        src={process.env.PUBLIC_URL + "/images/banner-img.jpg"}
        className="img-fluid w-100"
        style={{ height: matchesMd ? "250px" : "450px" }}
        alt=""
      />
    </div>
  );
}

export default Banner;

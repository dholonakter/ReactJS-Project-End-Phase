import React from 'react'
import bannerImg from "../assests/images/banner-img.jpg"

function Banner() {
    return (
        <div className="container">
            <img src={bannerImg} className="img-fluid w-100" style={{height: "70vh"}} alt="" />
        </div>
    )
}

export default Banner

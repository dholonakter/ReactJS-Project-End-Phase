import React from 'react'
//import bannerImg from "../assests/images/banner-img.jpg"

function Banner() {
    return (
        <div className="container">
            <img src={process.env.PUBLIC_URL + '/images/banner-img.jpg'} className="img-fluid w-100" style={{height: "70vh"}} alt="" />
        </div>
    )
}

export default Banner

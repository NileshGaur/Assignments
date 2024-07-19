// src/components/Banner/Banner.js
import React from "react";
import "./Banner.css";

import bannerImage from "../../assets/images/banner-image.jpeg";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <img src={bannerImage} alt="Banner Image"></img>
      </div>
      <div className="banner-bottom">
        <span>100% ORIGINAL PRODUCTS</span>
        <span>EASY RETURNS & REFUNDS</span>
        <span>100% SECURE PAYMENTS</span>
      </div>
    </>
  );
};

export default Banner;

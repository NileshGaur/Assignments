// src/components/Header/Header.js
import React from "react";
import { IoIosSearch } from "react-icons/io";
import "./Header.css";
import Logo from "../../assets/images/logo.jpg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo}></img>
      </div>
      <nav>
        <ul>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
          <li>Home & Living</li>
          <li>Beauty</li>
          <li>Studio</li>
        </ul>
      </nav>
      <div className="search">
        <IoIosSearch className="search-icon" />
        <input type="text" placeholder="Search for products, brands and more" />
      </div>
      <div className="profile">
        <span>Profile</span>
        <span>Wishlist</span>
        <span>Bag</span>
      </div>
    </header>
  );
};

export default Header;

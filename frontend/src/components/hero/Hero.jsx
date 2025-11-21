import React from "react";
import "./Hero.css";
import vector from '../../assets/images/Vector.png';
function Hero() {
  return (
    <div className="hero">
        <img src={vector} alt="" className="vector"/>
        <img src={vector} alt="" className="vector2"/>
      <div className="content">
        <h1>FIND CLOTHES THAT MATCH YOUR STYLE</h1>
        <p className="lead">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <button className="btn">Shop Now</button>

        <div className="stats">
          <div className="stat">
            <div className="num">200+</div>
            <div className="label">International Brands</div>
          </div>

          <div className="stat">
            <div className="num">2,000+</div>
            <div className="label">High-Quality Products</div>
          </div>

          <div className="stat">
            <div className="num">30,000+</div>
            <div className="label">Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

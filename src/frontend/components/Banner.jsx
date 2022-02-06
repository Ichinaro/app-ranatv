import React from "react";
import "./styles/Banner.css";

const Banner = (props) => {
  return (
    <div className="banner">
      <img src={props.banner} alt=""/>
    </div>
  );
};

export default Banner;

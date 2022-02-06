import React from "react";
import { Link } from "react-router-dom";
import "./styles/Category.css";

const Category = (props) => {
  return (
    <div className="category">
      <div className="tittle-category">
        <Link to={`/${props.param}`}>
          <h2>{props.title}</h2>
        </Link>
      </div>
      {props.children}
    </div>
  );
};

export default Category;

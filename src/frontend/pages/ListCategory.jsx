import React from "react";
import { connect } from "react-redux";
import banner from "../images/banner-rana.png";
import Banner from "../components/Banner";
import NotiList from "../components/NotiList";
import './styles/ListCategory.css'

const ListCategory = (props) => {
  const { category } = props.match.params;
  return (
    <React.Fragment>
      <div className="container">
        <Banner banner={banner} />
      </div>
      <div className="container margen">
        <ul className="category-noticias-container">
          <NotiList noticias={props.noticias} category={category} />
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    noticias: state.noticias,
  };
};

export default connect(mapStateToProps, null)(ListCategory);

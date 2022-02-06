import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNew } from "../actions/index";
import PropTypes from "prop-types";
import ButtomEdit from "./ButtomEdit";
import "./styles/NotiListItem.css";

const NotiListItem = (props) => {
  const movieId = props.noticia;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.deleteNew(movieId._id, "/");
  };
  return (
    <>
      <Link className="noticia-img" to={`/noticia/${movieId._id}`}>
        <img src={props.noticia.url} alt=""/>
      </Link>
      <div className="noticia-tittle">
        <h2>{props.noticia.titulo}</h2>
        {props.hasUser ? (
          <ButtomEdit
            dir={"noticia"}
            id={movieId._id}
            handleSubmit={handleSubmit}
          />
        ) : null}
      </div>
    </>
  );
};

const mapDispatchToProps = {
  deleteNew,
};

deleteNew.propTypes = {
  deleteNew: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(NotiListItem);

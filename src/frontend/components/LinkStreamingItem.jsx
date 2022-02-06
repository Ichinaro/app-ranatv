import React from "react";
import { connect } from "react-redux";
import { deleteStream } from "../actions/index";
import PropTypes from "prop-types";
import ButtomEdit from "./ButtomEdit";
import "./styles/LinkStreaming.css";

const ConfigList = (props) => {
  const streaming = props.streaming;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.deleteStream(streaming._id, "/");
  };

  return (
    <>
      <p className="live">{streaming.live}</p>
      <ButtomEdit
        dir={"stream"}
        id={streaming._id}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

const mapDispatchToProps = {
  deleteStream,
};

deleteStream.propTypes = {
  deleteStream: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(ConfigList);

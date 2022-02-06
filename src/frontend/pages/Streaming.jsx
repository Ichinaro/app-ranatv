import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStream } from "../actions/index";
import LiveForm from "../components/LiveForm";
import Player from "../components/Player";
import LinkStreaming from "../components/LinkStreaming";
import "./styles/Streaming.css";

const Streaming = (props) => {
  const { stream } = props;

  const [form, setValues] = useState({
    live: "",
  });

  const handleChange = (event) => {
    setValues({
      live: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createStream(form, "/");
    //props.history.push("/");
  };

  return (
    <div className="container">
      <LiveForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        value={form.live}
      />
      {stream.length ? (
        <div className="player">
          <Player ancho={560} alto={315} url={stream[0].live} />
        </div>
      ) : null}

      <div className="inf">
        <p>Link actual</p>
        <LinkStreaming stream={stream} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stream: state.stream,
  };
};

const mapDispatchToProps = {
  createStream,
};

Streaming.propTypes = {
  createStream: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Streaming);

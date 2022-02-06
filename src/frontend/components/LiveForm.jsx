import React from "react";
import "./styles/LiveForm.css";

const LiveForm = (props) => {
  return (
    <div className="content">
      <p className="titulo">LIVE STRREAMING</p>
      <form className="form" onSubmit={props.onSubmit}>
        <input
          type="text"
          className="code"
          name="live"
          values={props.value}
          onChange={props.onChange}
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default LiveForm;

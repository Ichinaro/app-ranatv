import React from "react";
import { Link } from "react-router-dom";
import "./styles/LinkStreaming.css";

const ButtomEdit = (props) => {
  const id = props.id; // _id o id?
  const dir = props.dir;

  return (
    <div className="btn">
      <button className="zise edit">
        <Link to={`/${dir}/${id}/config`}>Editar</Link>
      </button>
      <button className="zise delete" onClick={props.handleSubmit}>
        Eliminar
      </button>
    </div>
  );
};

export default ButtomEdit;

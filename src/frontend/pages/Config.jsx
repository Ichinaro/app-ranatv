import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNew } from "../actions/index";
import Form from "../components/Form";

const Config = (props) => {
  const [form, setValues] = useState({
    categoria: "Local",
    titulo: "",
    subTitulo: "",
    fecha: "",
    descripcion: "",
    url: "",
  });

  const handleChange = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createNew(form, "/");
    props.history.push("/");
  };

  return <Form onChange={handleChange} onSubmit={handleSubmit} value={form} />;
};

const mapDispatchToProps = {
  createNew,
};

Config.propTypes = {
  createNew: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Config);

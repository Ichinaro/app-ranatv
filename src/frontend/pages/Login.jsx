import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/index";
//import googleIcon from "../assets/static/google-icon.png";
//import twitterIcon from "../assets/static/twitter-icon.png";
import "./styles/Login.css";

const Login = (props) => {
  const [form, setValues] = useState({
    email: "",
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, "/");
    //props.history.push("/");
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2 tabIndex="0">Inicia sesión</h2>
        <form className="login__container--form" onSubmit={handleSubmit}>
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Correo"
            onChange={handleInput}
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Contraseña"
            onChange={handleInput}
          />
          <button className="button">Iniciar sesión</button>
        </form>
        <p className="login__container--register">
          No tienes ninguna cuenta&nbsp;
          <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </section>
  );
};

const mapDispatchToProps = {
  loginUser,
};

Login.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Login);

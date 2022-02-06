import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequest } from "../actions/index";
import PropTypes from "prop-types";
import "./styles/Nav.css";

const Navbar = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).includes("email"); //Object.keys(user).length > 0;
  const handleLogout = () => {
    document.cookie = "email=";
    document.cookie = "name=";
    document.cookie = "id=";
    document.cookie = "token=";
    props.logoutRequest({}); //mando un objeto vacio para reiniciar el estado y así no habria ususario
    window.location.href = "/login";
  };
  return (
    <div className="nav-menu">
      <Link to="/">
        <h1 className="nav-logo">RanaTV</h1>
      </Link>
      <ul className="nav-buttom">
          <li>
            <Link to="/">
              Inicio
            </Link>
          </li>
          {hasUser ? 
            <>
              <li>
                <Link to="/config">
                  Crear
                </Link>
              </li>
              <li>
                <Link to="/config/streaming">
                  Stream
                </Link>
              </li>
              <li>
                <Link to="" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          : null}
      </ul>
    </div>
  );
};

//El propTypes se pasa en su primera letra con minuscula
Navbar.propTypes = {
  //se usa para validar que tipo de valor reciben
  user: PropTypes.object.isRequired,
  // logoutRequest se define como func por que "user: action.payload" se usa reiniciar el estado
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

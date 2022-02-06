import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateNew } from "../actions/index";
import Form from "../components/Form";

const Edit = (props) => {
  const { id } = props.match.params;
  const data = props.noticias;

  function item() {
    const info = data.find((item) => item._id == id);
    return info;
  }

  const [form, setValues] = useState(item())

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    delete form._id;
    props.updateNew(id, form, "/");
  };

  return (
    <div className="pag-videos">
        <Form onChange={handleInput} onSubmit={handleSubmit} value={form} />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    noticias: state.noticias,
  };
};


const mapDispatchToProps = {
  updateNew,
};

Edit.propTypes = {
  updateNew: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
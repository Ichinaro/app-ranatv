import React from "react";
import "./styles/Form.css";

const Form = (props) => {
  return (
    <form className="formulario" onSubmit={props.onSubmit}>
      <div className="form-group">
        <label htmlFor="categoria">categoria</label>
        <select
          className="form-control"
          name="categoria"
          id="categoria"
          value={props.value.categoria}
          onChange={props.onChange}
        >
          <option>Local</option>
          <option>Nacional</option>
          <option>Internacional</option>
          <option>Deportes</option>
          <option>Artículo</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="titulo">Titulo</label>
        <input
          className="form-control"
          type="text"
          name="titulo"
          id="titulo"
          value={props.value.titulo}
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subTitulo">Sub-Titulo</label>
        <input
          className="form-control"
          type="text"
          name="subTitulo"
          id="subTitulo"
          value={props.value.subTitulo}
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fecha">Fecha</label>
        <input
          className="form-control"
          type="date"
          name="fecha"
          id="fecha"
          value={props.value.fecha}
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          className="col form-control"
          name="descripcion"
          id="descripcion"
          value={props.value.descripcion}
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="url">Imagen-url</label>
        <input
          className="form-control"
          type="url"
          name="url"
          id="url"
          value={props.value.url}
          onChange={props.onChange}
        />
      </div>
      <button className="btn btn-primary">Save</button>
      {props.error && <p className="text text-danger">{props.error.message}</p>}
    </form>
  );
};

export default Form;

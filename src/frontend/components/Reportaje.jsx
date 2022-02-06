import React from "react";
import { Link } from "react-router-dom";
import "./styles/Reportaje.css";

const ReportajeItem = (props)=> {
  return(
    <>
      <img src={props.noticia.url} alt="" />
      <div className="general-item">
        <p>{props.noticia.titulo}</p>
      </div>
    </>
  )
}

function Reportaje(props) {
  const noticias = props.noticias;
  const reportaje = ()=>{
    const news = noticias.filter((noticia) =>
      noticia.categoria.includes("Local"));
    return [news[0], news[1], news[2], news[3]];
  }

  if (reportaje().length > 0) {
    return (
      <ul className="contenedor-news-g">
        {reportaje().map((noticia) => {
          return (
            <li className="general" key={noticia._id}>
              <Link to={`/noticia/${noticia._id}`}>
                <ReportajeItem noticia={noticia} />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <p>No hay datos</p>;
  }
}

export default Reportaje;

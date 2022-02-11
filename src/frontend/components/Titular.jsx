import React from "react";
import Player from "./Player";
import { Link } from "react-router-dom";
import "./styles/Titular.css";

function Titular(props) {
  const stream = props.stream
  const titulares = props.titulares;
  const reportaje = titulares.filter((noticia) =>
    noticia.categoria.includes("Local")
  );

  const news = reportaje[0];

  if (reportaje.length > 0) {
    return (
      <div className="header">
        {stream.length ? 
        <iframe src ='//www.opencaster.com/ranafranklin-100-100' width='100%' height='100%' frameBorder='0' scrolling="no" target="_blank" allowFullScreen="yes"></iframe>
        : <div className="titular-item">
            <Link to={`/noticia/${news._id}`} className="imagen-noticia">
              <img src={news.url} alt=""/>
            </Link>
            <h2 className="titulo-noticia">
              {news.titulo}
            </h2>
          </div>
        }
        {/*stream.length ? 
        <div className="player-home">
          <Player ancho='100%' alto='100%' url={stream[0].live} />
        </div>  :
        <div className="titular-item">
          <Link to={`/noticia/${news._id}`} className="imagen-noticia">
            <img src={news.url} alt=""/>
          </Link>
          <h2 className="titulo-noticia">
            {news.titulo}
          </h2>
        </div> */}
        <div className="publicidad-items">
          <div className="publicidad">
            <a href="https://www.facebook.com/PererosDent-103648597933382" >
              <img src="https://i.postimg.cc/x8hDQbFs/Publicidad1.jpg" alt=""/>
            </a>
          </div>
          <div className="publicidad">
            <a href="https://www.facebook.com/PererosDent-103648597933382" >
              <img src="https://i.postimg.cc/x8hDQbFs/Publicidad1.jpg" alt=""/>
            </a>
          </div>
          <div className="publicidad">
            <a href="https://www.facebook.com/PererosDent-103648597933382" >
              <img src="https://i.postimg.cc/x8hDQbFs/Publicidad1.jpg" alt=""/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Titular;

import React from "react";
import {Helmet} from "react-helmet";
import './styles/BadgeInfo.css'

const BadgeInfo = (props) => {
  const { noticia, id } = props;

  const notas = noticia.find((item) => item._id === id)

  return (
    <React.Fragment>
      <Helmet>
        <title>{notas.titulo}</title>
        <meta property="og:url"                content={`https://ranatv.herokuapp.com/noticia/${id}`} />
        <meta property="og:type"               content="article" />
        <meta property="og:title"              content={notas.titulo} />
        <meta property="og:description"        content={notas.subTitulo}/>
        <meta property="og:image"              content={notas.url}  />
      </Helmet>
      <div className="pg-noticia">
        <h2 className="pg-noticia-tittle">{notas.titulo}</h2>
        <p className="pg-noticia-subtittle">{notas.subTitulo}</p>
        <div className="pg-noticia-img">
          <img src={notas.url} alt="..." />
        </div>
        <pre className="pg-noticia-descripcion">{notas.descripcion}</pre>
      </div>
    </React.Fragment>
  );
};

export default BadgeInfo;

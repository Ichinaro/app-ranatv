import React from "react";
import { connect } from "react-redux";
import "./styles/Notilist.css";
import NotiListItem from "./NotiListItem";

function NotiList(props) {
  const { user, noticias, category } = props;
  const hasUser = Object.keys(user).includes("email");
  const news = noticias.filter((noticia) =>
    noticia.categoria.includes(category)
  );

  if (news.length > 0) {
    return (
      <>
        {news.map((noticia) => {
          return (
            <li className="noticia-item" key={noticia._id}>
              <NotiListItem noticia={noticia} hasUser={hasUser} />
            </li>
          );
        })}
      </>
    );
  } else {
    return <p>No hay datos</p>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(NotiList);
//Crea una lista con todos los BadgesListItem y se exporta a Badges

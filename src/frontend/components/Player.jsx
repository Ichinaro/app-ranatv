import React from "react";
import ReactPlayer from "react-player";

const Player = (props) => {
  return (
    <ReactPlayer 
      className='react-player'
      width={props.ancho}
      height={props.alto}
      url={props.url}
    />
  );
};

export default Player;

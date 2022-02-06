import React from "react";
import { connect } from "react-redux";
import "./styles/LinkStreaming.css";
import LinkStreamingItem from "./LinkStreamingItem";

function Config(props) {
  const { stream } = props;

  if (stream.length > 0) {
    return (
      <ul>
        {stream.map((streaming) => {
          return (
            <li className="inf-code" key={streaming._id}>
              <LinkStreamingItem streaming={streaming} />
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <p>No hay datos</p>;
  }
}

export default Config;

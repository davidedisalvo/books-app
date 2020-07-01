import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import "./Header.scss";

const Header = (props) => {
  return (
    <Jumbotron
      className="header"
      style={
        props.image && {
          backgroundImage: `url(${props.image})`,
          backgroundPositionY: "10%",
        }
      }
    >
      <div className="inner">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        {props.children}
      </div>
    </Jumbotron>
  );
};

export default Header;

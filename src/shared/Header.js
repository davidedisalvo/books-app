import React, { useState, useEffect, useRef } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import "./Header.scss";
import TRUNK from "vanta/dist/vanta.trunk.min.js";

const Header = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!props.image) {
      if (!vantaEffect) {
        setVantaEffect(
          TRUNK({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: "#ffd869",
            backgroundColor: "#009fb7",
            spacing: 4.0,
            chaos: 1.5,
          })
        );
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }
  }, [vantaEffect]);
  return (
    <Jumbotron
      className="header"
      ref={myRef}
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

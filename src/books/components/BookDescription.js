import React from "react";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import "./BookDescription.scss";

const BookDescription = (props) => {
  if (props.description) {
    return (
      <Col xs={12}>
        <div className="book-description">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4>Description:</h4>

              <lottie-player
                src="https://assets1.lottiefiles.com/packages/lf20_d3R1M5.json"
                background="transparent"
                speed="1"
                style={{ width: "100px", height: "auto", marginTop: "-88px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
            <p>{props.description}</p>
          </div>
        </div>
      </Col>
    );
  } else {
    return null;
  }
};

export default BookDescription;

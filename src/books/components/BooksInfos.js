import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./BooksInfos.scss";

const BooksInfos = () => {
  return (
    <Container className="books-infos">
      <Row>
        <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_ViifFo.json"
            background="transparent"
            speed="1"
            style={{ maxWidth: "60vw" }}
            loop
            autoplay
          ></lottie-player>
        </Col>
        <Col xs={12}>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit{" "}
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default BooksInfos;

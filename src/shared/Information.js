import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Information.scss";
const Information = () => {
  const stopped = () => {};
  return (
    <Container fluid className="information">
      <Row style={{ position: "relative" }} className="justify-content-center">
        <Col md={{ span: 3 }} sm={12} className="column">
          <lottie-player
            src="https://assets5.lottiefiles.com/private_files/lf30_5IAwQ2.json"
            background="transparent"
            speed="1"
            style={{ width: "200px", height: "200px", marginBottom: "50px" }}
            autoplay
            loop
            id="test"
            isStopped={stopped}
          ></lottie-player>
          <div className="underAnimation">
            <h5>POST</h5>
          </div>
        </Col>
        {/* <Col>
        <lottie-player
          src="https://assets6.lottiefiles.com/packages/lf20_hKKOrQ/up.json"
          background="transparent"
          speed="1"
          style={{ width: "100vw", height: "200px", position: "absolute" }}
          autoplay
          loop
          id="test"
          isStopped={stopped}
        ></lottie-player>
          ></lottie-player>
        </Col> */}
        <Col className="column" md={{ span: 3, offset: 1 }} sm={12}>
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_bQy33T.json"
            background="transparent"
            speed="1"
            style={{ width: "200px", height: "200px", marginBottom: "50px" }}
            loop
            autoplay
          ></lottie-player>
          <div className="underAnimation">
            <h5>RATE</h5>
          </div>
        </Col>
        {/* <Col>
          {" "}
          <lottie-player
            src="https://assets5.lottiefiles.com/private_files/lf30_xkRFbO.json"
            background="transparent"
            speed="1"
            style={{ width: "100px", height: "100px" }}
            autoplay
            loop
            isStopped={stopped}
          ></lottie-player>
        </Col> */}
        <Col className="column" md={{ span: 3, offset: 1 }} sm={12}>
          <lottie-player
            src="https://assets7.lottiefiles.com/temp/lf20_oGlWy5.json"
            background="transparent"
            speed="1"
            style={{ width: "200px", height: "200px", marginBottom: "50px" }}
            loop
            autoplay
          ></lottie-player>
          <div className="underAnimation">
            <h5>SHARE</h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Information;

import React from "react";
import "./Footer.scss";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col sm={8} xs={12}>
            <p>
              My first MERN application. See my others projects on{" "}
              <a target="_blank" href="https://davidedisalvo.com">
                MY SITE
              </a>{" "}
            </p>
            <ul className="flex-list">
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/books">Books</NavLink>
              </li>
              <li>Davide Di Salvo&#169;</li>
            </ul>
          </Col>
          <Col sm={4} xs={12}>
            <p>Contact me</p>
            <ul className="flex-list-2">
              <li>
                <a href="mailto:davidesimone.disalvo@gmail.com">
                  <AiFillMail />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/davide-di-salvo-75aa16a2/">
                  <AiFillLinkedin />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

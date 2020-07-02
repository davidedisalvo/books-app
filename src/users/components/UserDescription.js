import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import "./UserDescription.scss";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { storage } from "../../firebase/index";

const UserDescription = (props) => {
  const auth = useContext(AuthContext);
  let location = useLocation();
  const [url, setUrl] = useState();

  const gettingImage = () => {
    storage
      .ref("images")
      .child(props.uid)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    gettingImage();
  });

  const uidUrlParams = location.pathname.substr(1);
  return (
    <section className="user-description">
      <Container>
        <Row className="align-items-center">
          <Col lg={3} sm={4} xs={12}>
            <div>
              <div className="imgContainer">
                <img src={url} />
              </div>
              <div className="infos">
                <div className="inner">
                  <h3>{props.name}</h3>
                  <p>Books read: {props.books && props.books.length}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg={{ span: 7, offset: 2 }}
            sm={{ span: 6, offset: 2 }}
            xs={12}
            className="text-left bio"
          >
            <h4>Bio</h4>
            <p>{props.bio}</p>
            {auth.userId === uidUrlParams && (
              <NavLink to="/books/new">
                Add a book to your list <BsArrowRight />
              </NavLink>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserDescription;

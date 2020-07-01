import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

import "./SingleUser.scss";
import { Link, NavLink } from "react-router-dom";

const SingleUser = (props) => {
  return (
    // <Card className="rounded-4 single-user">
    //   <Card.Img variant="top" src={props.image} />
    //   <Card.Body>
    //     <Card.Title>{props.name}</Card.Title>
    //     <Card.Text>Books read: {props.books.length}</Card.Text>
    //     <Button variant="light" className="cta">
    //       <Link to={`/${props.id}`}>View profile </Link>
    //     </Button>
    //   </Card.Body>
    // </Card>
    <Link to={`/${props.id}`}>
      <Card className="card mb-3 single-user">
        <Row className="row no-gutters">
          <Col sm={4} className="card-image-container">
            <div className="inner">
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_API_URL}/${props.image}`}
              />
            </div>
          </Col>
          <Col sm={8} className="inner">
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                Books read: {props.books && props.books.length}
              </Card.Text>
              <Card.Text>
                Visit the profile <BsArrowRight />
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default SingleUser;

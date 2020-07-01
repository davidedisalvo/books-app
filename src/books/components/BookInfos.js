import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";

import "./BookInfos.scss";
import axios from "axios";
import Spinner from "../../shared/Spinner";

const BookInfos = (props) => {
  const [starsNumber, setStarsNumber] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const ratingChanged = (rating) => {
    setIsLoading(true);
    if (props.id) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/books/${props.id}/rate`,
        data: {
          average: rating,
        },
      })
        .then((response) => {
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true);
        });
    }
  };
  useEffect(() => {
    if (props.id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/books/${props.id}`)
        .then((response) => {
          if (response.data.book.rate) {
            const rate = Math.round(response.data.book.rate.average);
            setStarsNumber(rate);
          }
        });
    }
  }, [props.id, isLoading]);

  return (
    <Col xs={12} sm={8} md={6}>
      <h3>Book infos:</h3>
      <div className="book-infos">
        <Card className="card ">
          <Row className="row no-gutters">
            <Col xs={12} sm={4} className="card-image-container">
              <Card.Img variant="top" src={props.image} />
            </Col>
            <Col xs={12} sm={8}>
              <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                {props.authors !== "" && (
                  <Card.Text style={{ fontStyle: "italic" }}>
                    {props.authors}
                  </Card.Text>
                )}
                {props.publisher !== undefined && (
                  <Card.Text>
                    <span>Publisher:&nbsp;</span>
                    {props.publisher}
                  </Card.Text>
                )}
                {props.publishedDate !== "" && (
                  <Card.Text>
                    <span>Published date:&nbsp;</span>
                    {props.publishedDate}
                  </Card.Text>
                )}
              </Card.Body>
              <ReactStars
                value={starsNumber}
                count={5}
                onChange={ratingChanged}
                size={24}
                half={false}
                color2={"#FED766"}
                color1={"#272727"}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  );
};

export default BookInfos;

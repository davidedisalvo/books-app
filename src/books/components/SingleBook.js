import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";

import "./SingleBook.scss";

const SingleBook = (props) => {
  useEffect(() => {
    var findClass = document.getElementsByClassName("equalizer");
    var tallest = 0;
    // Loop over matching divs
    for (let i = 0; i < findClass.length; i++) {
      var ele = findClass[i];
      var eleHeight = ele.offsetHeight;
      tallest = eleHeight > tallest ? eleHeight : tallest;
    }
    for (let i = 0; i < findClass.length; i++) {
      findClass[i].style.height = tallest + "px";
    }
  }, []);
  return (
    <Card className="rounded-3 single-book">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <div className="equalizer">
          <Card.Title>
            <span>Title:&nbsp;</span>
            {props.title}
          </Card.Title>
          <Card.Title>
            {props.authors[0] !== null && (
              <>
                <span>Author:&nbsp;</span>
                {props.authors}{" "}
              </>
            )}
            {/* <span>Author:&nbsp;</span>
            {props.authors} */}
          </Card.Title>
          <Card.Text>
            {props.users.length > 0 && (
              <>
                <span>Books read by:</span> {props.users && props.users.length}
                {props.users.length === 1 ? " person " : " people "}in this
                community
              </>
            )}
          </Card.Text>
        </div>

        <Link to={`/books/${props.id}`} className="view-book">
          View book <BsArrowRight />
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;

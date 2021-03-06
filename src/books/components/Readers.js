import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/index";
import { Col, ListGroup } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./Readers.scss";

const Readers = (props) => {
  const [readers, setReaders] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const test = [];

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/readers/${props.id}`)
      .then(async (response) => {
        const responsData = response.data.users;

        setReaders(responsData);
      })
      .catch((err) => {});
  }, [props.id]);

  return (
    <Col xs={12} sm={4} md={{ span: 4, offset: 2 }}>
      <div className="readers">
        <h4>USERS WHO READ THIS BOOK:</h4>
        <ListGroup>
          {readers &&
            readers.map((r) => (
              <NavLink to={`/${r._id}`}>
                <ListGroup.Item>
                  <div className="inner">
                    <div className="image-container">
                      {/* <img src={r.url} /> */}
                    </div>
                    <p>{r.name}</p>
                  </div>
                  <BsArrowRight />
                </ListGroup.Item>
              </NavLink>
            ))}
        </ListGroup>
      </div>
    </Col>
  );
};

export default Readers;

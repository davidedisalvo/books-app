import React, { useEffect, useState } from "react";
import SingleUser from "./SingleUser";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const UsersList = () => {
  // const Users = [
  //   {
  //     id: "u1",
  //     email: "u1@test.test",
  //     name: "user 1",
  //     password: "user1",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //     books: ["b1", "b2", "b3"],
  //   },
  //   {
  //     id: "u2",
  //     email: "u2@test.test",
  //     name: "user 2",
  //     password: "user2",
  //     image: "https://www.w3schools.com/howto/img_avatar.png",
  //     books: ["b1", "b2", "b3"],
  //   },
  // ];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users`
        );

        const responseData = response.data.users;

        setLoadedUsers(responseData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <div>
      <Container>
        <div className="main-title">
          <h1>READERS</h1>
        </div>
        <Row className="justify-content-md-center">
          {!isLoading &&
            loadedUsers &&
            loadedUsers.map((el) => {
              return (
                <Col md={8} sm={12}>
                  <SingleUser key={el.id} {...el} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
};

export default UsersList;

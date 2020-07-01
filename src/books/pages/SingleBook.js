import React, { useEffect, useState } from "react";
import BookInfos from "../components/BookInfos";
import Readers from "../components/Readers";
import BookDescription from "../components/BookDescription";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import "./SingleBook.scss";

const SingleBook = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [singleBook, setSingleBook] = useState([]);
  //get user by id where the id is the params on router dom
  useEffect(() => {
    const sendRequest = async () => {
      const bid = props.match.params.bid;
      setIsLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/books/${bid}`)
        .then((response) => {
          const responseData = response.data.book;
          setSingleBook(responseData);
        })
        .catch((err) => {
          setError(err.message);
        });

      setIsLoading(false);
    };
    sendRequest();
  }, []);
  return (
    <>
      <section>
        <div className="main-title">
          <h1>{singleBook.title}</h1>
        </div>
        <Container fluid className="container-bookInfos">
          <Row className="align-items-stretch">
            <BookInfos
              id={singleBook.id}
              title={singleBook.title}
              authors={singleBook.authors}
              publisher={singleBook.publisher}
              {...singleBook.rate}
              image={singleBook.image}
              publishedDate={singleBook.publishedDate}
            />
            <Readers id={singleBook.id} />
          </Row>
        </Container>
      </section>
      <section>
        <Container fluid>
          <Row>
            <BookDescription description={singleBook.description} />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SingleBook;

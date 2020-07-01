import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./SuggestionsList";
import { Form, Container, Row, Col } from "react-bootstrap";
import "./NewBook.scss";

class Search extends Component {
  state = {
    query: "",
    results: [],
  };

  getInfo = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&maxResults=20
`
      )
      .then((data) => {
        this.setState({
          results: data.data.items,
        });
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  };

  render() {
    return (
      <Container className="book-form">
        <div className="main-title">
          <h1>Add a book</h1>
        </div>
        <h5>
          Search a book from googlebook database with more than 10000 title
        </h5>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form style={{ marginTop: "50px" }}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Start typing to search a book</Form.Label>
                <Form.Control
                  className="rounded-0"
                  placeholder="Search books by title"
                  ref={(input) => (this.search = input)}
                  onChange={this.handleInputChange}
                  autoComplete="off"
                />
                <Suggestions results={this.state.results} />
              </Form.Group>
            </Form>
          </Col>
          <Col
            sm={8}
            xs={12}
            style={{
              position: "absolute",
              top: "48%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "-1",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_kq5rGs.json"
              background="transparent"
              speed="1"
              style={{ width: "100%" }}
              loop
              autoplay
            ></lottie-player>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;

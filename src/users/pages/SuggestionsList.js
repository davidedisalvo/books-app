import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

import "./SuggestionsList.scss";
import axios from "axios";

const Suggestions = (props) => {
  const history = useHistory();

  const auth = useContext(AuthContext);
  const [bookComponent, setBookComponent] = useState(false);
  const [book, setBook] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      url: `${process.env.REACT_APP_API_URL}/api/books/new`,
      data: {
        title: book.volumeInfo.title,
        authors:
          typeof book.volumeInfo.authors === Array
            ? [...book.volumeInfo.authors]
            : [book.volumeInfo.authors],
        description: book.volumeInfo.description,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
        image: book.volumeInfo.imageLinks.smallThumbnail,
        creator: auth.userId,
      },
    })
      .then((response) => {
        history.push(`/${auth.userId}`);

        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleShow = () => setShow(true);
  const showBook = (r) => {
    setShow(true);
    setBook(r);
  };

  return (
    <div className="create-book">
      <ul>
        {props.results &&
          props.results.map((r) => {
            return (
              <li key={r.id} onClick={() => showBook(r)}>
                <span>{`${r.volumeInfo.title}`}</span>
                {r.volumeInfo.authors && (
                  <span style={{ display: "block", fontStyle: "italic" }}>
                    {r.volumeInfo.authors}
                  </span>
                )}
              </li>
            );
          })}
      </ul>

      <>
        <Modal show={show} onHide={handleClose} className="suggestionsList">
          <Modal.Header closeButton>
            <Modal.Title className="trunc">
              {book.length !== 0 && book.volumeInfo.title}
            </Modal.Title>
            <img
              src={
                book.length !== 0 && book.volumeInfo.imageLinks.smallThumbnail
              }
            />
          </Modal.Header>
          <Modal.Body>
            <p>
              <span>Author:&nbsp;</span>
              {book.length !== 0 && book.volumeInfo.authors}
            </p>
            <p>
              <span>Publisher:&nbsp;</span>
              {book.length !== 0 &&
                `${book.volumeInfo.publisher} ${book.volumeInfo.publishedDate}`}
            </p>
            <p>
              <span>Published Ddte:&nbsp;</span>
              {book.length !== 0 && book.volumeInfo.publishedDate}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="cta" onClick={handleSubmit}>
              Add book
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Suggestions;

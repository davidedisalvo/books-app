import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import SingleBook from "./SingleBook";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const BooksList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      if (props.userId) {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/books`)
          .then((response) => {
            const responseData = response.data.books;

            let arr = [];
            const filteredData = responseData.forEach((element) => {
              const filter = element.users.find((el) => el == props.userId);
              console.log(filter);
              if (filter) {
                return arr.push(element);
              }
            });
            console.log(arr);
            if (arr.length !== 0) {
              return setLoadedBooks(arr);
            } else {
              setError(true);
            }
          });
      } else {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/books`)
          .then((response) => {
            const responseData = response.data.books;

            setLoadedBooks(responseData);
          });
      }

      setIsLoading(false);
    };
    sendRequest();
  }, [props.userId, auth.isLoggedIn]);
  return (
    <section>
      {loadedBooks.length !== 0 ? (
        <Container>
          <div className="main-title">
            <h1>BOOKS</h1>
          </div>
          <Row>
            {loadedBooks.map((el) => {
              return (
                <Col lg={4} sm={6} xs={12}>
                  <SingleBook {...el} />
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <h5 style={{ textAlign: "center" }}>
          This user doesn't have any book on his list, yet
        </h5>
      )}
    </section>
  );
  //   } else {
  //     return (
  //       <section>
  //         {loadedBooks.length !== 0 ? (
  //           <Container>
  //             <div className="main-title">
  //               <h1>BOOKS</h1>
  //             </div>
  //             <Row>
  //               {!isLoading &&
  //                 !error &&
  //                 loadedBooks.length !== 0 &&
  //                 loadedBooks.map((el) => {
  //                   return (
  //                     <Col lg={4} sm={6} xs={12}>
  //                       <SingleBook {...el} />
  //                     </Col>
  //                   );
  //                 })}
  //             </Row>
  //           </Container>
  //         ) : (
  //           <h5 style={{ textAlign: "center" }}>
  //             This user doesn't have any book on his list, yet
  //           </h5>
  //         )}
  //       </section>
  //     );
  //   }
};

export default BooksList;

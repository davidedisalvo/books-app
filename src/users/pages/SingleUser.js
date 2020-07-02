import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDescription from "../components/UserDescription";
import BooksList from "../../books/components/BooksList";

const SingleUser = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [singleUser, setSingleUser] = useState([]);
  //get user by id where the id is the params on router dom
  useEffect(() => {
    const sendRequest = async () => {
      const uid = props.match.params.uid;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${uid}`
        );

        const responseData = await response.data.user;

        setSingleUser(responseData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [isLoading, singleUser]);
  return (
    <div>
      <UserDescription
        name={singleUser.name}
        uid={props.match.params.uid}
        bio={singleUser.bio}
        image={singleUser.image}
        books={singleUser.books}
      />
      <BooksList userId={props.match.params.uid}></BooksList>
    </div>
  );
};

export default SingleUser;

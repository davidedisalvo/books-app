import React, { useEffect } from "react";
import Header from "../../shared/Header";
import BooksList from "../components/BooksList";
import BooksInfos from "../components/BooksInfos";
import axios from "axios";

const Books = () => {
  return (
    <div>
      <Header
        image={require("../../images/books2.jpg")}
        title="Here the most popular books shared by our users"
      />
      <BooksInfos />
      <BooksList />
    </div>
  );
};

export default Books;

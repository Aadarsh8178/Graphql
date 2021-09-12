import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import BookDetails from "./BookDetails";

const BooksList = () => {
  const [selectedBook, setSelectedBook] = useState();
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book, ind) => (
          <li
            key={book.id}
            onClick={() => setSelectedBook({ ...book, index: ind })}
          >
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails
        id={selectedBook?.id}
        setSelectedBook={setSelectedBook}
        deleteAllowed={selectedBook?.index > 6}
        ind={5}
      />
    </div>
  );
};

export default BooksList;

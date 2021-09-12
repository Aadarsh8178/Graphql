import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_BOOK, GET_BOOK, GET_BOOKS } from "../queries";

const BookDetails = ({ id, setSelectedBook, deleteAllowed, ind }) => {
  const [getBook, { loading, error, data }] = useLazyQuery(GET_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    update() {
      setSelectedBook(null);
    },
  });

  useEffect(() => {
    if (id) {
      getBook({
        variables: {
          id,
        },
      });
    }
  }, [id]);

  const handleDelete = () => {
    deleteBook({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };
  if (!id) {
    return (
      <div id="book-details">
        <p>No book selected...</p>
      </div>
    );
  }
  return (
    <div id="book-details">
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data && data.book && (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          {deleteAllowed ? (
            <p
              className="theme-button"
              style={{ background: "#eee" }}
              onClick={handleDelete}
            >
              Delete
            </p>
          ) : (
            <span className="dull-text">
              Delete allowed from {ind + 1}th book onwards{" "}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetails;

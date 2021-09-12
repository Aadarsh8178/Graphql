import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from "../queries";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !genre || !authorId) {
      return;
    }
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        >
          <option>Select author</option>
          {data?.authors &&
            data.authors.map((author) => (
              <option value={author.id} key={author.id}>
                {author.name}
              </option>
            ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;

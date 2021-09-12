import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

export const GET_AUTHORS = gql`
  query {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      id
    }
  }
`;

export const GET_BOOK = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      name
      id
    }
  }
`;

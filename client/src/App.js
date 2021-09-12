import React from "react";
import BooksList from "./components/BooksList";
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AddBook from "./components/AddBook";

//apollo client setup
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, location, path }) => {
      console.log("GraphQL ERROR : " + message);
    });
  }
  if (networkError) {
    console.log("Network ERROR");
  }
});
const link = from([errorLink, new HttpLink({ uri: "/graphql" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BooksList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;

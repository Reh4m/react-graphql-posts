import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://share-images-reh4m.herokuapp.com/graphql",
});

const authLink = setContext(() => {
  // If no token with key of "token" in localStorage, add it
  if (!localStorage.token) {
    localStorage.setItem("token", "");
  }

  // Operation adds the token to an auth header, which is sent to backend
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
});

console.log(authLink.concat(httpLink));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

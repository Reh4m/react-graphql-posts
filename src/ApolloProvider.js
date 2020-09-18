import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
});

const authLink = setContext(() => {
  // If no token with key of "token" in localStorage, add it.
  if (!localStorage.token) {
    localStorage.setItem("token", "");
  }

  // Operation adds the token to an auth header, which is sent to backend.
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log("[networkError]", networkError);
  }
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.dir(err);
      // if (err.name === 'AuthenticationError') {

      // }
    }
  }
});

const link = ApolloLink.from([httpLink, authLink, errorLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

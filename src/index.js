import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
      uri: 'http://localhost:8080/graphql'
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));

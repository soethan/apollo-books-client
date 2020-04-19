import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import { userSessionQuery } from './queries/loginQueries';

const cache = new InMemoryCache();
cache.writeQuery({
  query: userSessionQuery,
  data: {
    userName: '',
    isLoggedIn: false,
  },
});
const client = new ApolloClient({
  cache,
  link: new HttpLink({
      uri: 'http://localhost:8080/graphql'
  }),
  resolvers: {
  //   isLoggedIn() {
  //     console.log('isLoggedIn resolver called');
  //     return {
  //       isLoggedIn: true
  //     };
  //   }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));

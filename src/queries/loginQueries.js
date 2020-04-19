import { gql } from '@apollo/client';

const userSessionQuery = gql`
  query userSession {
    isLoggedIn @client
  }
`;

const loginQuery = gql`
  query login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      userName
    }
  }
`;

export { loginQuery, userSessionQuery };

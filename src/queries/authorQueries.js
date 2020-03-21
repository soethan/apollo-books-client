import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`{
  findAllAuthors {
    id
    firstName
    lastName
  }
}`;

export { getAuthorsQuery };

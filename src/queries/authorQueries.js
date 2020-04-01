import { gql } from '@apollo/client';

const getAuthorsQuery = gql`{
  findAllAuthors {
    id
    firstName
    lastName
  }
}`;

export { getAuthorsQuery };

import { gql } from 'apollo-boost';

const getBooksQuery = gql`query allBooks {
  countBooks
  findAllBooks {
    id
    title
    isbn
    author {
      id
      firstName
      lastName
    }
    pageCount
  }
}`;

const getBookDetailsQuery = gql`query getBookDetails($id: ID!) {
  findBookById(id: $id) {
    id
    isbn
    title
    pageCount
  }
}`;

export { getBooksQuery, getBookDetailsQuery };

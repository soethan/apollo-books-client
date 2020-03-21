import { gql } from 'apollo-boost';

const addBookMutation = gql`mutation addBook($title: String!, $isbn: String!, $pageCount: Int, $author: ID!) {
  newBook(title: $title, isbn: $isbn, pageCount: $pageCount, author: $author) {
    id
    title
    author {
      id
      firstName
      lastName
    }
    pageCount
  }
}`;

export { addBookMutation };

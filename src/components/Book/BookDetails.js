import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import './style.scss';
import { getBookDetailsQuery } from '../../queries/bookQueries';

const BookDetails = props => {
  console.log(props);
  const { loading, findBookById: book } = props.data;
  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div className="book-container">
        <h3>Book Details</h3>
        <div>{book.title}</div>
        <div>{book.isbn}</div>
      </div>
    );
  }
}

export default graphql(getBookDetailsQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);

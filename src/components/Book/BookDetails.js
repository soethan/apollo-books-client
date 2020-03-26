import React from 'react';
import { graphql } from 'react-apollo';
import './style.scss';
import { getBookDetailsQuery } from '../../queries/bookQueries';

const BookDetails = props => {
  const { loading, findBookById: book } = props.data;
  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div className="book-container details">
        <div className="row">
          <label>Title: </label>
          {book.title}
        </div>
        <div className="row">
          <label>ISBN: </label>
          {book.isbn}
        </div>
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

import React from 'react';
import { useQuery } from '@apollo/client';

import './style.scss';
import { getBookDetailsQuery } from '../../queries/bookQueries';

const BookDetails = props => {
  const { loading, data } = useQuery(getBookDetailsQuery, {
    variables: {
      id: props.bookId
    }
  });

  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else if (data) {
    const { findBookById: book } = data;
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

export default BookDetails;

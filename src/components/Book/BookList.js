import React from 'react';
import { graphql } from 'react-apollo';
import './style.scss';
import { getBooksQuery } from '../../queries/bookQueries';

const BookList = props => {
  const { loading, countBooks: count, findAllBooks: books } = props.data;

  const handleTitleClick = id => () => {
    props.onBookSelect(id);
  }
  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div className="book-container">
        <h3><label>Book List</label> <label className="count">{count}</label></h3>
        <ul className="list">
          {books.map(book => <li key={book.id} onClick={handleTitleClick(book.id)}>{book.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

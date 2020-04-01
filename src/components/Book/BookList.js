import React from 'react';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import './style.scss';
import { getBooksQuery } from '../../queries/bookQueries';

const BookList = props => {
  const { loading, data } = useQuery(getBooksQuery);

  const handleTitleClick = id => () => {
    props.onBookSelect(id);
  }
  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else if (!isEmpty(data)) {
    const { countBooks: count, findAllBooks: books } = data;
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

export default React.memo(BookList);

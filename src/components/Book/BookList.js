import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { isEmpty } from 'lodash';
import './style.scss';
import { getBooksQuery } from '../../queries/bookQueries';

const BookList = props => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const client = useApolloClient();

  useEffect(() => {
    async function fetchData() {
      let result = await client.query({
        query: getBooksQuery
      });
      setLoading(result.loading);
      setData(result.data);
    }
    fetchData();
  }, [props.version]);

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

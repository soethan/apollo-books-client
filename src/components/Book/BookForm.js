import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import './style.scss';
import { getBooksQuery } from '../../queries/bookQueries';
import { getAuthorsQuery } from '../../queries/authorQueries';
import { addBookMutation } from '../../mutation/bookMutations';

const BookForm = props => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [author, setAuthor] = useState(0);

  const resetForm = () => {
    setTitle('');
    setIsbn('');
    setPageCount(0);
    setAuthor(0);
  }

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }
  const handleIsbnChange = e => {
    setIsbn(e.target.value);
  }
  const handlePageCountChange = e => {
    setPageCount(e.target.value);
  }
  const handleAuthorChange = e => {
    setAuthor(e.target.value);
  }

  const handleSave = () => {
    props.addBookMutation({
      variables: {
        title,
        isbn,
        pageCount,
        author
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    resetForm();
    props.onClose();
  };

  const handleCancel = () => {
    resetForm();
    props.onClose();
  }

  const { loading, findAllAuthors: authors } = props.getAuthorsQuery;
  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div className="book-container form">
        <div className="row">
          <label>Title: </label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="row">
          <label>ISBN: </label>
          <input type="text" value={isbn} onChange={handleIsbnChange} />
        </div>
        <div className="row">
          <label>Page Count: </label>
          <input type="number" min="1" max="10000" value={pageCount} onChange={handlePageCountChange} />
        </div>
        <div className="row">
          <label>Author: </label>
          <select value={author} onChange={handleAuthorChange}>
            <option>Select Author</option>
            {authors.map(item =>
              <option key={item.id} value={item.id}>{item.firstName + ' ' + item.lastName}</option>)}
          </select>
        </div>
        <div className="row btn-row last-row">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(BookForm);

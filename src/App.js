import React, { useState } from 'react';
import Modal, { setAppElement } from './components/Modal';
import { BookForm, BookList, BookDetails } from './components/Book';
import { LoginForm } from './components/Login';
import { userSessionQuery } from './queries/loginQueries';
import './App.css';
import { useQuery } from '@apollo/client';

function App() {
  const [selectedBookId, setSelectedBookId] = useState();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const { data } = useQuery(userSessionQuery);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowDetailsForm(false);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setShowDetailsForm(false);
    setShowAddForm(true);
  }

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
    setShowLoginForm(false);
    setShowAddForm(false);
    setShowDetailsForm(true);
  }

  const handleCloseModal = () => {
    showAddForm && setShowAddForm(false);
    showDetailsForm && setShowDetailsForm(false);
    showLoginForm && setShowLoginForm(false);
  }

  const getTitle = () => {
    if (showAddForm) {
      return 'Book Form';
    } else if (showDetailsForm) {
      return 'Book Details';
    } else if (showLoginForm) {
      return 'Login';
    }
    return '';
  }

  const isModalOpen = () => (!data.isLoggedIn && showLoginForm) || showAddForm || showDetailsForm;

  return (
    <div className="App">
      <Modal
        title={getTitle()}
        isOpen={isModalOpen()}
        onClose={handleCloseModal}
      >
        {showAddForm && <BookForm onClose={handleCloseModal} />}
        {showDetailsForm && selectedBookId && <BookDetails bookId={selectedBookId} />}
        {showLoginForm && <LoginForm onClose={handleCloseModal} />}
      </Modal>
      <div>
        <button className="add-btn" onClick={handleAddClick}>+</button>
        <button className="login-btn" onClick={handleLoginClick} disabled={data.isLoggedIn}>Login</button>
      </div>
      <div>
        <BookList version={1} onBookSelect={handleBookSelect} />
      </div>
    </div>
  );
}

setAppElement('root');

export default App;

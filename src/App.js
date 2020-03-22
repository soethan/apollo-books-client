import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Modal, { setAppElement } from './components/Modal';
import { BookForm, BookList, BookDetails } from './components/Book';
import './App.css';

function App() {
  const [selectedBookId, setSelectedBookId] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
  });

  const handleAddClick = () => {
    setModalIsOpen(true);
    setShowDetailsForm(false);
    setShowAddForm(true);
  }

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
    setModalIsOpen(true);
    setShowAddForm(false);
    setShowDetailsForm(true);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Modal
          title={showAddForm ? "Book Form" : "Book Details"}
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
        >
          {showAddForm && <BookForm onClose={handleCloseModal} />}
          {showDetailsForm && selectedBookId && <BookDetails bookId={selectedBookId} />}
        </Modal>
        <div>
          <button className="add-btn" onClick={handleAddClick}>Add</button>
        </div>
        <div>
          <BookList onBookSelect={handleBookSelect} />
        </div>
      </ApolloProvider>
    </div>
  );
}

setAppElement('root');

export default App;

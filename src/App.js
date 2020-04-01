import React, { useState } from 'react';
import Modal, { setAppElement } from './components/Modal';
import { BookForm, BookList, BookDetails } from './components/Book';
import './App.css';

function App() {
  const [selectedBookId, setSelectedBookId] = useState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const handleAddClick = () => {
    setShowDetailsForm(false);
    setShowAddForm(true);
  }

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
    setShowAddForm(false);
    setShowDetailsForm(true);
  }

  const handleCloseModal = () => {
    showAddForm && setShowAddForm(false);
    showDetailsForm && setShowDetailsForm(false);
  }
  return (
    <div className="App">
      <Modal
        title={showAddForm ? "Book Form" : "Book Details"}
        isOpen={showAddForm || showDetailsForm}
        onClose={handleCloseModal}
      >
        {showAddForm && <BookForm onClose={handleCloseModal} />}
        {showDetailsForm && selectedBookId && <BookDetails bookId={selectedBookId} />}
      </Modal>
      <div>
        <button className="add-btn" onClick={handleAddClick}>+</button>
      </div>
      <div>
        <BookList version={1} onBookSelect={handleBookSelect} />
      </div>
    </div>
  );
}

setAppElement('root');

export default App;

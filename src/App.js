import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BookForm, BookList, BookDetails } from './components/Book';
import './App.css';

function App() {
  const [selectedBookId, setSelectedBookId] = useState();

  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
  });

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
  }
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BookList onBookSelect={handleBookSelect} />
        {selectedBookId && <BookDetails bookId={selectedBookId} />}
        <BookForm />
      </ApolloProvider>
    </div>
  );
}

export default App;

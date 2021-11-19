import React from 'react';
import Book from './book';

function Shelf ({books, title, changeShelf}) {
  
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {books.map(book => (
                      <Book key={book.id} book={book} changeShelf={changeShelf} />
                  ))}
              </ol>
            </div>
        </div>
    )
}

export default Shelf;
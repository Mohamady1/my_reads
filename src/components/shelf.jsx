import React from 'react';
import Book from './book';

function Shelf ({books, title, changeShelf}) {
  
  let id = 21;
  
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {books.map(book => (
                      <Book key={++id} book={book} changeShelf={changeShelf} />
                  ))}
              </ol>
            </div>
        </div>
    )
}

export default Shelf;

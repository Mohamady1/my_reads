import React from 'react';
import Shelf from './shelf';

function Shelves ({allbooks, changeShelf}) {

    const allBooks  = allbooks;


    return (   
        <div className="list-books-content">
        <div>
          <Shelf title={"Currently Reading"} books={allBooks.filter(book => book.shelf === "currentlyReading")} changeShelf={changeShelf} /> {/*Currently Reading*/}
          <Shelf title={"Want To Read"} books={allBooks.filter(book => book.shelf === "wantToRead")} changeShelf={changeShelf} /> {/*Want to Read*/}  
          <Shelf title={"Read"} books={allBooks.filter(book => book.shelf === "read")} changeShelf={changeShelf} /> {/*Read*/}
        </div>
      </div>
    )
}

export default Shelves;
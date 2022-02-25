import React from 'react';

function Book ({book, changeShelf}) {

  function getInfo (e) {
    changeShelf(book, e.target.value);
  }

  return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks
                ? `url("${book.imageLinks.thumbnail}")`
                : `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZUYP1nWYaAFpSvhTYPwzO91_T6Sbdiysw-juuJQ5daDmBCjKm3oA_oP2toTI4Ni8Y98&usqp=CAU")`,

              backgroundPosition: "center",
              backgroundSize: "cover", }}></div>
              <div className="book-shelf-changer">
                <select 
                  value={book.shelf ? book.shelf : "none"} 
                  onChange={getInfo} >

                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>

              </select>

              </div>
            </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
}

export default Book;

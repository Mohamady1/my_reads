import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelves from './components/Shelves';
import Book from './components/book';
import Title from './components/title';
import './App.css';


function App() {
  //global variables
  const [homepageBooks, setHomepageBooks] = useState(new Map());
  const [query, setQuery] = useState("");
  const [allData, getData] = useState([]);
  const [searchBox, setSearchBox] = useState([]);
  const [mergedBox, setMergedBox] = useState([]);

  //merged in array
  //console.log(mergedBox)
  //console.log(allData);
  //console.log(searchBox);
  
  //fetch API
  useEffect ( () => {
    BooksAPI.getAll().then(
      (res) => {
       getData(res);
       setHomepageBooks(createMapOfBooks(res))
      //console.log(res)
      }
      )
  }, []);

  //check searchpage
  useEffect ( () => {
    let isActive = true
    if (query) {
      BooksAPI.search(query).then(data => {
          if(isActive) {
          setSearchBox(data);
          }
      })
    }
    return () => {
      isActive = false
        setSearchBox([])
    }
  }, [query])

  //what user type in searchpage
  function typing  (e)  {
    setQuery(e.target.value);
    //console.log(query);
  }

  //to get all books in on homepage
  function createMapOfBooks  (books)  {
    const map = new Map();
    books.map(book => map.set(book.id, book))
    return map;
  }

  //change between shelves by user click 
  function changeShelf  (book, shelf)  {
    const updatedBooks = allData.map(bookApi => {

      if (bookApi.id === book.id) {
        book.shelf = shelf;
        return book;
      }
      
      return bookApi;
    })
    if (!homepageBooks.has(book.id)) {
      book.shelf = shelf;
      updatedBooks.push(book); //get new book at homepage without refresh
    }
    getData(updatedBooks);
    BooksAPI.update(book, shelf); //when page refresh data will not lost
  };
  //console.log(allData)
  
  //merge between searchpage and homepage books by ID
  useEffect ( () => {
    const combined = searchBox.map(book => {
      if (homepageBooks.has(book.id)) {
        return homepageBooks.get(book.id)
      }
      else {
        return book;
      }
    })
    setMergedBox(combined);
    // eslint-disable-next-line
  }, [searchBox]);

return (
<div className="app">
  <Router>
    <Switch>
            <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button className="close-search">Close</button>
              </Link>
              <div style={{backgroundColor:"white"}} className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={typing} />  
                {query === "" ? <h1 style={{backgroundColor: "white", textAlign:"center"}}>No Books Avaliable Write Your Interest</h1> : null}
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {mergedBox.map(searchbook => (
                      <Book key={searchbook.id} book={searchbook} changeShelf={changeShelf} />
                  ))}
              </ol>
            </div>
          </div>
          </Route>
          <Route path="/">
          <div className="list-books">
            <Title />
            <Shelves allbooks={allData} changeShelf={changeShelf} />
            
            <div className="open-search">
              <Link to="/search">
              <button>Add a book</button>
              </Link>
            </div>
          </div>
          </Route>
          </Switch>
          </Router>
      </div>
  );
}

export default App;
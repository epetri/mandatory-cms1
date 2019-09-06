import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/home.js';
import Article from './components/article.js';
import Authors from './components/author.js';

function App() {
  return (
    <Router>
      <div>
        <nav className='nav'>
          <Link className='a' to='/'>
            Home
          </Link>
          <Link className='a' to='/Authors'>
            Author
          </Link>
        </nav>
        <Route exact path='/' component={Home} />
        <Route path='/Article/:id' component={Article} />
        <Route path='/Authors' component={Authors} />
      </div>
    </Router>
  );
}

export default App;

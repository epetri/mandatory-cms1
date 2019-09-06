import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './home.css';

function createList(Article) {
  return (
    <Link
      className='article-container'
      to={'/Article/' + Article._id}
      key={Article._id}
    >
      <li className='article-li'>
        <div className='article-div'>
          <h2 className='article-title'>{Article.Title}</h2>
          <img className='article-img' src={Article.Image.path}></img>
          <p className='article-text'>{Article.Body}</p>
          <div className='author-info'>
            <h6 className='info-author'>{Article.Author.display}</h6>
            <h6 className='info-date'>{Article.Published_on}</h6>
          </div>
        </div>
      </li>
    </Link>
  );
}

function Home() {
  const [books, updateBooks] = useState(null);
  const [page, updatePage] = useState(0);
  const [skip, updateSkip] = useState(0);

  function increasePage() {
    if (skip === page - 3) {
      updateSkip(0);
    } else {
      updateSkip(skip + 3);
    }
  }

  function decreasePage() {
    if (skip === 0) {
      updateSkip(page - 3);
    } else {
      updateSkip(skip - 3);
    }
  }

  useEffect(() => {
    axios
      .get(
        'http://192.168.99.101:8080/api/collections/get/Articles?limit=3&skip=' +
          skip
      )
      .then(response => {
        console.log(response.data);

        updateBooks(response.data.entries);
        updatePage(response.data.total);
      });
  }, [skip]);

  return (
    <div className='container'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {!books ? (
        <p>Loading...</p>
      ) : (
        <ul className='container-ul'>
          {books.map(Article => {
            return createList(Article);
          })}
        </ul>
      )}

      <button className='button-increase' onClick={() => increasePage()}>
        next
      </button>
      <button className='button-decrease' onClick={() => decreasePage()}>
        back
      </button>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './author.css';

function createList(Author) {
  return (
    <li key={Author._id}>
      <div className='author-div'>
        <h5>{Author.Name}</h5>
        <img src={Author.Avatar.path}></img>
        <p>{Author.Description}</p>
      </div>
    </li>
  );
}

function Authors() {
  const [author, updateAuthor] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.99.101:8080/api/collections/get/Authors')
      .then(response => {
        console.log(response.data);

        updateAuthor(response.data.entries);
      });
  }, []);

  return (
    <div className='container'>
      <Helmet>
        <title>Author</title>
      </Helmet>
      <ul className='container-author'>
        {author.map(Authors => {
          return createList(Authors);
        })}
      </ul>
    </div>
  );
}

export default Authors;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './article.css';

function Article({ match }) {
  const [article, updateArticle] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://192.168.99.101:8080/api/collections/get/Articles?filter[_id]=${match.params.id}`
      )
      .then(response => {
        console.log(response.data);

        updateArticle(response.data.entries[0]);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Article</title>
      </Helmet>
      {!article ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='container-article'>
            <h4>{article.Title}</h4>
            <h6>{article.Author.display}</h6>
            <h6>{article.Published_on}</h6>
            <ReactMarkdown className='body'>{article.Body}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}

export default Article;

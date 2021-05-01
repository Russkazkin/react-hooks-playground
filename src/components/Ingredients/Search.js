import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';
import axios from "../../axios";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
    (async () => {
      const response = (await axios.get('ingredients.json' + query)).data;
      const ingredients = [];
      for (const key in response) {
        if(response.hasOwnProperty(key)) {
          ingredients.push({
            id: key,
            title: response[key].title,
            amount: response[key].amount,
          });
        }
      }
      //onLoadIngredients(ingredients);
    })();
  }, [filter, onLoadIngredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filter} onChange={event => {setFilter(event.target.value)}} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

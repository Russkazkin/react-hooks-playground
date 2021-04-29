import React, {useState, useEffect} from 'react';
import axios from '../../axios';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (async () => {
      const response = (await axios.get('ingredients.json')).data;
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
      setIngredients(ingredients);
    })();
  }, []);

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);


  const addIngredient = async ingredient => {
    const response = (await axios.post('ingredients.json', ingredient)).data;
    setIngredients(previousIngredients => [...previousIngredients, {...ingredient, id: response.name}]);
  }
  const removeIngredient = id => {
    setIngredients(previousIngredients => previousIngredients.filter(ingredient => ingredient.id !== id));
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;

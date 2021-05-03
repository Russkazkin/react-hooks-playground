import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../axios';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const filterHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);


  const addIngredient = async ingredient => {
    const response = (await axios.post('ingredients.json', ingredient)).data;
    setIngredients(previousIngredients => [...previousIngredients, {...ingredient, id: response.name}]);
  }
  const removeIngredient = async id => {
    await axios.delete(`ingredients/${id}.json`);
    setIngredients(previousIngredients => previousIngredients.filter(ingredient => ingredient.id !== id));
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search onLoadIngredients={filterHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;

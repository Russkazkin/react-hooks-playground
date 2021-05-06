import React, {useReducer, useState, useEffect, useCallback} from 'react';
import axios from '../../axios';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const filterHandler = useCallback(filteredIngredients => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);


  const addIngredient = async ingredient => {
    setIsLoading(true);
    const response = (await axios.post('ingredients.json', ingredient)).data;
    setIsLoading(false);
    dispatch({
      type: 'ADD',
      ingredient: {...ingredient, id: response.name},
    });
  }
  const removeIngredient = async id => {
    setIsLoading(true);
    try {
      await axios.delete(`ingredients/${id}.json`);
      setIsLoading(false);
      dispatch({
        type: 'DELETE',
        id,
      });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredient} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;

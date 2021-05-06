import React, {useReducer, useEffect, useCallback} from 'react';
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

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currentHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'CLEAR':
      return { ...currentHttpState, error: null };
    default:
      throw new Error('Should not get there!');
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });

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
    dispatchHttp({type: 'SEND'});
    const response = (await axios.post('ingredients.json', ingredient)).data;
    dispatchHttp({type: 'RESPONSE'});
    dispatch({
      type: 'ADD',
      ingredient: {...ingredient, id: response.name},
    });
  }
  const removeIngredient = async id => {
    dispatchHttp({type: 'SEND'});
    try {
      await axios.delete(`ingredients/${id}.json`);
      dispatchHttp({type: 'RESPONSE'});
      dispatch({
        type: 'DELETE',
        id,
      });
    } catch (error) {
      dispatchHttp({ type: 'ERROR', error: error.message });
    }
  }

  const clearError = () => {
    dispatchHttp({type: 'CLEAR'});
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredient} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filterHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;

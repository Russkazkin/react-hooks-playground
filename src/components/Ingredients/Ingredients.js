import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../axios';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const filterHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);


  const addIngredient = async ingredient => {
    setIsLoading(true);
    const response = (await axios.post('ingredients.json', ingredient)).data;
    setIsLoading(false);
    setIngredients(previousIngredients => [...previousIngredients, {...ingredient, id: response.name}]);
  }
  const removeIngredient = async id => {
    setIsLoading(true);
    try {
      await axios.delete(`ingredients/${id}.json`);
      setIsLoading(false);
      setIngredients(previousIngredients => previousIngredients.filter(ingredient => ingredient.id !== id));
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

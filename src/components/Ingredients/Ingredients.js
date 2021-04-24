import React, {useState} from 'react';
import axios from "axios";

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = props => {
  const [ingredients, setIngredients] = useState([]);
  const addIngredient = async ingredient => {
    const response = (await axios.post('https://react-hooks-playground-d70ef-default-rtdb.firebaseio.com/ingredients.json', ingredient)).data;
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

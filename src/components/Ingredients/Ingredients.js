import React, {useState} from 'react';
import _ from 'lodash';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = props => {
  const [ingredients, setIngredients] = useState([]);
  const addIngredient = ingredient => {
    setIngredients(previousIngredients => [...previousIngredients, {...ingredient, id: _.uniqueId('ingredient_')}]);
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

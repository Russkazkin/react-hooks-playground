import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import { AuthContext } from "./context/auth-context";
import Auth from "./components/Auth";

const App = props => {
  const authContext = useContext(AuthContext);

  return authContext.isAuth ? <Ingredients /> : <Auth />;
};

export default App;

import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinkDetails';
import MealsInProgress from './pages/MealsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id-da-receita" component={ MealsDetails } />
      <Route exact path="/drinks/:id-da-receita" component={ DrinksDetails } />
      <Route path="/meals/:id-da-receita/in-progress" component={ MealsInProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFavorite from '../components/CardFavorite';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(AppContext);
  return (
    <div>
      <Header title="Favorite Recipes" searchImage={ false } />
      <form
        name="filters"
      >
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </form>
      {favoriteRecipes.map((recipe, index) => (
        <CardFavorite key={ uuidv4() } recipe={ recipe } index={ index } />
      ))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;

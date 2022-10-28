import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFavorite from '../components/CardFavorite';
import AppContext from '../context/AppContext';
import FilterForm from '../components/FilterForm';

function FavoriteRecipes() {
  const { favoriteRecipes, storageFilter } = useContext(AppContext);
  return (
    <div>
      <Header title="Favorite Recipes" searchImage={ false } />
      <FilterForm />
      {favoriteRecipes
        .filter(({ type }) => ((storageFilter === '') ? true : type === storageFilter))
        .map((recipe, index) => (
          <CardFavorite key={ uuidv4() } recipe={ recipe } index={ index } />
        ))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;

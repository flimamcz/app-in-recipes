import React, { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFavorite from '../components/CardFavorite';
import AppContext from '../context/AppContext';
import FilterForm from '../components/FilterForm';
import { getFavoriteRecipes } from '../services/localStorageHelper';

function FavoriteRecipes() {
  const { setFavoriteRecipes, favoriteRecipes, storageFilter } = useContext(AppContext);

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, [setFavoriteRecipes]);

  return (
    <main>
      <Header title="Favorite Recipes" searchImage={ false } />
      <FilterForm />
      <Stack
        component="main"
        className="container-card"
        spacing={ 2 }
        sx={ { padding: '0 10px' } }
      >
        {favoriteRecipes
          .filter(({ type }) => ((storageFilter === '') ? true : type === storageFilter))
          .map((recipe, index) => (
            <CardFavorite key={ uuidv4() } recipe={ recipe } index={ index } />
          ))}
      </Stack>
      <Footer />
    </main>
  );
}

export default FavoriteRecipes;

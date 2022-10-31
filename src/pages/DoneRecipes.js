import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterForm from '../components/FilterForm';
import { getDoneRecipes } from '../services/localStorageHelper';
import CardFavorite from '../components/CardFavorite';
import AppContext from '../context/AppContext';
// import PropTypes from 'prop-types';

function DoneRecipes() {
  const { storageFilter } = useContext(AppContext);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, [setDoneRecipes]);

  return (
    <main>
      <Header title="Done Recipes" searchImage={ false } />
      <FilterForm />
      {doneRecipes
        .filter(({ type }) => ((storageFilter === '') ? true : type === storageFilter))
        .map((recipe, index) => (
          <CardFavorite key={ uuidv4() } recipe={ recipe } index={ index } />
        ))}
      <Footer />
    </main>
  );
}

export default DoneRecipes;

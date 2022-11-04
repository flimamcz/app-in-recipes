import React, { useContext, useEffect, useState } from 'react';
import { Stack } from '@mui/system';
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
      <Stack component="main" spacing={ 2 } sx={ { padding: '0 10px' } }>

        <FilterForm />
        {doneRecipes
          .filter(({ type }) => ((storageFilter === '') ? true : type === storageFilter))
          .map((recipe, index) => (
            <CardFavorite key={ uuidv4() } recipe={ recipe } index={ index } />
          ))}

      </Stack>
      <Footer />
    </main>
  );
}

export default DoneRecipes;

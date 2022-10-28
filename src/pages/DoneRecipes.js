import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterForm from '../components/FilterForm';
// import PropTypes from 'prop-types';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" searchImage={ false } />
      <FilterForm />
      <Footer />
    </div>
  );
}

export default DoneRecipes;

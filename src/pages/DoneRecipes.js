import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import PropTypes from 'prop-types';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" searchImage={ false } />
      <Footer />
    </div>
  );
}

// DoneRecipes.propTypes = { key: PropTypes.type};

export default DoneRecipes;

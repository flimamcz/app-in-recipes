import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import PropTypes from 'prop-types';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" searchImage={ false } />
      <Footer />
    </div>
  );
}

// FavoriteRecipes.propTypes = { key: PropTypes.type};

export default FavoriteRecipes;

import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import PropTypes from 'prop-types';

function Recipes() {
  return (
    <div>
      <Header title="Recipes" searchImage />
      <Footer />
    </div>
  );
}

// Recipes.propTypes = { key: PropTypes.type};

export default Recipes;

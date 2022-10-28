import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import PropTypes from 'prop-types';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" searchImage={ false } />
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
      <Footer />
    </div>
  );
}

// O botão de filtro All deve ter o atributo data-testid="filter-by-all-btn";
// O botão de filtro Meals deve ter o atributo data-testid="filter-by-meal-btn";
// O botão de Drinks deve ter o atributo data-testid="filter-by-drink-btn";
// A imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image";
// O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text";
// O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name";
// O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
// O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
// As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;

// DoneRecipes.propTypes = { key: PropTypes.type};

export default DoneRecipes;

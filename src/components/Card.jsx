import PropTypes from 'prop-types';
import React from 'react';

function Card({ index, recipe, type }) {
  const { strMealThumb, strMeal } = recipe;
  const { strDrinkThumb, strDrink } = recipe;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ type === '/meals' ? strMealThumb : strDrinkThumb }
        data-testid={ `${index}-card-img` }
        alt="imagem de uma receita"
        width={ 100 }
      />
      <h2
        data-testid={ `${index}-card-name` }
      >
        {type === '/meals' ? strMeal : strDrink}
      </h2>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.string,
}.isRequired;

export default Card;

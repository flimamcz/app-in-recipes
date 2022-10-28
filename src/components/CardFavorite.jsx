import PropTypes from 'prop-types';
import React from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function CardFavorite({ recipe, index }) {
  const { image, name, nationality, category, type, alcoholicOrNot } = recipe;
  return (
    <div>
      <img
        src={ image }
        alt={ name }
        width="20"
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      {type === 'meal' && (
        <p span data-testid={ `${index}-horizontal-top-text` }>
          {nationality}
          {' '}
          -
          {' '}
          {category}
        </p>
      )}

      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'drink' && alcoholicOrNot}
      </p>
      <FavoriteButton recipeData={ recipe } indexTest={ index } />
      <ShareButton recipeData={ recipe } indexTest={ index } />
    </div>
  );
}

CardFavorite.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default CardFavorite;

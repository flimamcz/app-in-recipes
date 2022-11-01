import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function CardFavorite({ recipe, index }) {
  const {
    id,
    image,
    name,
    nationality,
    category,
    type,
    alcoholicOrNot,
    tags,
    doneDate } = recipe;
  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          width="20"
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      {type === 'meal' && (
        <p data-testid={ `${index}-horizontal-top-text` }>
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
      <div>
        { ((type === 'meal') && doneDate !== undefined) && (tags
          .filter((item, tagIndex) => tagIndex < 2)
          .map((element) => (
            <p
              key={ uuidv4() }
              data-testid={ `${index}-${element}-horizontal-tag` }
            >
              { element }
            </p>)))}
      </div>

      { (doneDate !== undefined) && (
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>)}
      <FavoriteButton recipeData={ recipe } indexTest={ index } />
      <ShareButton recipeData={ recipe } testid={ `${index}-horizontal-share-btn` } />
    </div>
  );
}

CardFavorite.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default CardFavorite;

import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
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
    <Paper
      elevation={ 5 }
      sx={ {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        border: '1px solid, black' } }
    >
      <Box sx={ { width: '50%' } }>
        <Link to={ `/${type}s/${id}` }>
          <img
            style={ { borderRadius: '10px' } }
            src={ image }
            alt={ name }
            height="165"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </Box>
      <Box sx={ { width: '50%', display: 'flex', flexDirection: 'column' } }>
        <Link style={ { textDecoration: 'none' } } to={ `/${type}s/${id}` }>
          <Typography
            variant="h7"
            data-testid={ `${index}-horizontal-name` }
            color="black"
            sx={ {
              fontWeight: 700,
            } }
          >
            {name}
          </Typography>
        </Link>
        {type === 'meal' && (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {nationality}
            {' '}
            -
            {' '}
            {category}
          </span>
        )}

        <span
          data-testid={ `${index}-horizontal-top-text` }
        >
          {type === 'drink' && alcoholicOrNot}
        </span>

        { (doneDate !== undefined) && (
          <p data-testid={ `${index}-horizontal-done-date` }>
            {`Done date: ${new Date(doneDate).toLocaleDateString('pt-BR')}`}
          </p>)}
        <Box sx={ { display: 'flex', justifyContent: 'space-evenly' } }>
          { ((type === 'meal') && doneDate !== undefined) && (tags
            .filter((item, tagIndex) => tagIndex < 2)
            .map((element) => (
              <span
                key={ uuidv4() }
                data-testid={ `${index}-${element}-horizontal-tag` }
              >
                { element }
              </span>)))}
        </Box>

        <Box sx={ { display: 'flex' } }>
          <FavoriteButton recipeData={ recipe } indexTest={ index } />
          <ShareButton recipeData={ recipe } testid={ `${index}-horizontal-share-btn` } />
        </Box>
      </Box>
    </Paper>

  );
}

CardFavorite.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default CardFavorite;

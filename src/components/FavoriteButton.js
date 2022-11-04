import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  getFavoriteRecipes,
  removeFavoriteRecipes,
  saveFavoriteRecipes,
} from '../services/localStorageHelper';
import AppContext from '../context/AppContext';

function FavoriteButton({ recipeData, indexTest }) {
  const [favorite, setFavorite] = useState(false);
  const { setFavoriteRecipes } = useContext(AppContext);

  const handleFavorite = () => {
    if (favorite) {
      removeFavoriteRecipes(recipeData);
    } else {
      saveFavoriteRecipes(recipeData);
    }
    const favoriteRecipes = getFavoriteRecipes();
    setFavoriteRecipes(favoriteRecipes);
    setFavorite(!favorite);
  };

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();
    const isFavorite = favoriteRecipes.some(({ id }) => id === recipeData.id);
    if (isFavorite) {
      setFavorite(true);
    }
  }, [recipeData]);

  return (
    <div>
      <IconButton
        data-testid={
          indexTest >= 0
            ? `${indexTest}-horizontal-favorite-btn`
            : 'favorite-btn'
        }
        type="button"
        color="primary"
        onClick={ handleFavorite }
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      </IconButton>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default FavoriteButton;

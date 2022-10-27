import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  getFavoriteRecipes,
  removeFavoriteRecipes,
  saveFavoriteRecipes } from '../services/localStorageHelper';

function FavoriteButton({ recipeData }) {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    if (favorite) {
      removeFavoriteRecipes(recipeData);
    } else { saveFavoriteRecipes(recipeData); }
    setFavorite(!favorite);
  };

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();
    const isFavorite = favoriteRecipes.some(({ id }) => id === recipeData.id);
    if (isFavorite) { setFavorite(true); }
  }, [recipeData]);

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ handleFavorite }
      >
        <img alt="favLogo" src={ favorite ? blackHeartIcon : whiteHeartIcon } />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default FavoriteButton;

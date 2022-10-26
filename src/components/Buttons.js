import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  getFavoriteRecipes,
  removeFavoriteRecipes,
  saveFavoriteRecipes } from '../services/localStorageHelper';

function Buttons({ recipeData }) {
  const [copyMessage, setCopyMessage] = useState(false);
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
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => {
          copy(window.location.href);
          setCopyMessage(true);
        } }
      >
        <img src={ shareIcon } alt="shareImage" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ handleFavorite }
      >
        <img alt="favLogo" src={ favorite ? blackHeartIcon : whiteHeartIcon } />
      </button>
      { copyMessage && <span>Link copied!</span>}
    </div>
  );
}

Buttons.propTypes = {
  recipeData: PropTypes.shape,
}.isRequired;

export default Buttons;

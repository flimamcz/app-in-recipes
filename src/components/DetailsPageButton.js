import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getInProgressRecipes,
  saveDoneRecipes,
  saveFavoriteRecipes,
  // saveInProgressRecipe,
  removeFavoriteRecipes } from '../services/localStorageHelper';

function DetailsPageButton(props) {
  const [recipeStatus, setRecipeStatus] = useState();
  const { recipeData } = props;
  const { type } = recipeData;

  const handleClick = () => {
    // saveInProgressRecipe(recipeData, []);
    saveDoneRecipes(recipeData);
  };

  const handleFavorite1 = () => {
    saveFavoriteRecipes(recipeData);
  };

  const handleFavorite2 = () => {
    removeFavoriteRecipes(recipeData);
  };

  useEffect(() => {
    const inProgressRecipes = getInProgressRecipes();
    const isInProgress = Object
      .keys(inProgressRecipes[type])
      .some((recipe) => recipe === recipeData.id);
    if (isInProgress) {
      setRecipeStatus('IN_PROGRESS');
    }
  }, [recipeStatus, recipeData, type]);

  const inProgressButton = () => (
    <button
      // className="fixed-bottom"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      Continue Recipe
    </button>
  );

  const startButton = () => (
    <button
      // className="fixed-bottom"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      Start Recipe
    </button>
  );

  const renderButton = () => {
    switch (recipeStatus) {
    case 'IN_PROGRESS':
      return inProgressButton();
    default:
      return startButton();
    }
  };

  return (
    <div>
      { renderButton() }
      <button
        type="button"
        onClick={ handleFavorite1 }
      >
        Favorito+
      </button>
      <button
        type="button"
        onClick={ handleFavorite2 }
      >
        Favorito-
      </button>
    </div>
  );
}

DetailsPageButton.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default DetailsPageButton;

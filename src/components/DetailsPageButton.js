import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getInProgressRecipes,
  saveInProgressRecipe,
  getDoneRecipes } from '../services/localStorageHelper';

function DetailsPageButton(props) {
  const [recipeStatus, setRecipeStatus] = useState();
  const { recipeData, history } = props;
  const { type } = recipeData;

  const handleRecipeStatus = useCallback(() => {
    const inProgressRecipes = getInProgressRecipes();
    const isInProgress = Object
      .keys(inProgressRecipes[type])
      .some((recipe) => recipe === recipeData.id);
    const actualDoneRecipes = getDoneRecipes();
    const isDone = actualDoneRecipes.some(({ id }) => id === recipeData.id);
    setRecipeStatus('START');
    if (isInProgress) {
      setRecipeStatus('IN_PROGRESS');
    } else if (isDone) {
      setRecipeStatus('DONE');
    }
  }, [recipeData.id, type]);

  const handleClick = () => {
    saveInProgressRecipe(recipeData, []);
    handleRecipeStatus();
    history.push(`/${type}/${recipeData.id}/in-progress`);
  };

  useEffect(() => {
    handleRecipeStatus();
  }, [handleRecipeStatus]);

  return (
    <div>
      { (recipeStatus === 'IN_PROGRESS') && (
        <button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Continue Recipe
        </button>)}
      { (recipeStatus === 'START') && (
        <button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Start Recipe
        </button>)}
      { (recipeStatus === 'DONE') && (null)}

    </div>
  );
}

DetailsPageButton.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default DetailsPageButton;

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getInProgressRecipes,
  saveInProgressRecipe,
  getDoneRecipes,
  saveDoneRecipes,
  removeInProgressRecipe } from '../services/localStorageHelper';
import AppContext from '../context/AppContext';

function DetailsPageButton(props) {
  const { setLoading, checkedIngredients } = useContext(AppContext);
  const [recipeStatus, setRecipeStatus] = useState();
  const history = useHistory();
  const { recipeData } = props;
  const { type } = recipeData;

  const handleRecipeStatus = useCallback(() => {
    const isInProgressPage = history.location.pathname.split('/')[3];
    const inProgressRecipes = getInProgressRecipes();
    const isInProgress = Object
      .keys(inProgressRecipes[type])
      .some((recipe) => recipe === recipeData.id);
    const actualDoneRecipes = getDoneRecipes();
    const isDone = actualDoneRecipes.some(({ id }) => id === recipeData.id);
    setRecipeStatus('START');
    if (isInProgressPage) {
      setRecipeStatus('IN_PROGRESS_PAGE');
    } else if (isInProgress) {
      setRecipeStatus('IN_PROGRESS');
    } else if (isDone) {
      setRecipeStatus('DONE');
    }
  }, [recipeData.id, type, history]);

  const handleClick = ({ target: { name } }) => {
    if (name === 'start') { saveInProgressRecipe(recipeData, checkedIngredients); }
    handleRecipeStatus();
    setLoading(true);
    history.push(`/${type}/${recipeData.id}/in-progress`);
  };

  useEffect(() => {
    handleRecipeStatus();
  }, [handleRecipeStatus]);

  const finishRecipe = () => {
    saveDoneRecipes(recipeData);
    removeInProgressRecipe(recipeData);
    history.push('/done-recipes');
  };

  const finishDisable = () => Object
    .keys(recipeData.ingredients).length === checkedIngredients.length;

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
          name="start"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Start Recipe
        </button>)}
      { (recipeStatus === 'IN_PROGRESS_PAGE') && (
        <button
          className="fixed-bottom"
          type="button"
          disabled={ !finishDisable() }
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
        >
          Finish Recipe
        </button>
      ) }
      { (recipeStatus === 'DONE') && (null)}

    </div>
  );
}

DetailsPageButton.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default DetailsPageButton;

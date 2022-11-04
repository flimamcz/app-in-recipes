import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
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

    console.log(isInProgressPage);
    console.log(isInProgress);
    console.log(isDone);
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
    <Box sx={ { width: '80%', position: 'fixed', bottom: '0', left: '10%' } }>
      { (recipeStatus === 'IN_PROGRESS') && (
        <Button
          fullWidth
          variant="contained"
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Continue Recipe
        </Button>)}
      { (recipeStatus === 'START') && (
        <Button
          fullWidth
          variant="contained"
          type="button"
          name="start"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Start Recipe
        </Button>)}
      { (recipeStatus === 'IN_PROGRESS_PAGE') && (
        <Button
          fullWidth
          variant="contained"
          type="button"
          disabled={ !finishDisable() }
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
        >
          Finish Recipe
        </Button>
      ) }
      { (recipeStatus === 'DONE') && (null)}

    </Box>
  );
}

DetailsPageButton.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default DetailsPageButton;

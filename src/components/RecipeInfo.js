import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import IngredientItem from './IngredientItem';
import { getInProgressRecipes } from '../services/localStorageHelper';
import AppContext from '../context/AppContext';

import { filterKeys } from '../services/objectHelper';

function RecipeInfo(props) {
  const {
    checkedIngredients,
    setCheckedIngredients,
    handleCheck } = useContext(AppContext);
  const { recipeData } = props;
  const {
    id: recipeId,
    type,
    category,
    alcoholicOrNot,
    instructions,
    name,
    image,
    video,
    ingredients,
  } = recipeData;

  useEffect(() => {
    const getInProgress = getInProgressRecipes();
    const find = Object.entries(getInProgress[type])
      .find((recipe) => recipe[0] === recipeId);
    if (find !== undefined) {
      setCheckedIngredients(find[1]);
    }
  }, [recipeId, type, setCheckedIngredients]);

  const testFunctions = () => {
    filterKeys(recipeData, 'Ingredient');
  };

  return (
    <section className="contaniner-fluid">
      <button
        type="button"
        onClick={ testFunctions }
      >
        Testar Função
      </button>
      <div>
        <img
          width={ 200 }
          data-testid="recipe-photo"
          src={ image }
          alt="RecipeImage"
        />
        <div className="d-flex">
          <FavoriteButton recipeData={ recipeData } />
          <ShareButton />
        </div>
        <h3 data-testid="recipe-title">{ name }</h3>
        {(type === 'drinks') ? (
          <p
            data-testid="recipe-category"
          >
            {alcoholicOrNot}
          </p>) : null }
        <h3 data-testid="recipe-category">{ category }</h3>

      </div>
      <ul>
        {Object.values(ingredients).map((ingredient, index) => (
          <IngredientItem
            key={ `${ingredient}${index}` }
            ingredient={ ingredient }
            index={ index }
            handleCheck={ handleCheck }
            checkedIngredients={ checkedIngredients }
          />
        ))}
      </ul>
      <p data-testid="instructions">{ instructions }</p>
      {(type === 'meals') ? (

        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ video }
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        >
          Video
        </iframe>) : null }
    </section>
  );
}

RecipeInfo.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default RecipeInfo;

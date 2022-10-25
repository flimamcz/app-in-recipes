import React from 'react';
import PropTypes from 'prop-types';

function RecipeInfo(props) {
  const { recipeData, recipeType } = props;
  const { thumb, ingredients, instructions, category, title, other } = recipeData;
  return (
    <section className="contaniner-fluid">
      <div>
        <img
          width={ 200 }
          data-testid="recipe-photo"
          src={ thumb }
          alt="RecipeImage"
        />

        <h3 className="card-title" data-testid="recipe-title">{ title }</h3>
        {(recipeType === 'drinks') ? (
          <p className="card-text" data-testid="recipe-category">{ other }</p>) : null }
        <h3 className="card-text" data-testid="recipe-category">{ category }</h3>

      </div>
      <ul>
        {Object.values(ingredients).map((ingredient, index) => (
          <li
            key={ `${ingredient}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>))}
      </ul>
      <p data-testid="instructions">{ instructions }</p>
      {(recipeType === 'meals') ? (

        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ other }
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
  recipeType: PropTypes.string,
}.isRequired;

export default RecipeInfo;

import React from 'react';
import PropTypes from 'prop-types';

function RecipeInfo(props) {
  const { recipeData } = props;
  const {
    type,
    category,
    alcoholicOrNot,
    instructions,
    name,
    image,
    video,
    ingredients,
  } = recipeData;
  return (
    <section className="contaniner-fluid">
      <div>
        <img
          width={ 200 }
          data-testid="recipe-photo"
          src={ image }
          alt="RecipeImage"
        />

        <h3 className="card-title" data-testid="recipe-title">{ name }</h3>
        {(type === 'drinks') ? (
          <p
            className="card-text"
            data-testid="recipe-category"
          >
            {alcoholicOrNot}
          </p>) : null }
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

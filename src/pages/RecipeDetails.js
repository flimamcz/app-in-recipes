import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import {
  fetchMealById,
  fetchDrinkById,
  fetchDrinkRecommendation,
  fetchMealRecommendation } from '../services/fetchHelper';
import Loading from '../components/Loading';
import { handleObject } from '../services/objectHelper';

function RecipeDetails({ location: { pathname } }) {
  const { loading, setLoading } = useContext(AppContext);
  const [recipeType, setRecipeType] = useState('');
  const [recipeData, setRecipeData] = useState({});

  useEffect(() => {
    const getPageInfo = async () => {
      setLoading(true);

      const urlData = pathname.split('/');
      const actualRecipeType = urlData[1];
      const recipeId = urlData[2];

      const recipeInfo = (actualRecipeType === 'meals') ? (
        await fetchMealById(recipeId)) : (await fetchDrinkById(recipeId));

      const recommendation = (actualRecipeType === 'meals') ? (
        await fetchDrinkRecommendation()) : await (fetchMealRecommendation());

      console.log(recommendation);
      setRecipeType(actualRecipeType);
      setRecipeData(handleObject(recipeInfo[0]));
      setLoading(false);
    };

    getPageInfo();
  }, [pathname, setLoading]);

  const renderDetails = () => {
    const { photo, ingredients, instructions, category, title, other } = recipeData;
    return (
      <section>
        <img width={ 200 } data-testid="recipe-photo" src={ photo } alt="RecipeImage" />
        <h3 data-testid="recipe-title">{ title }</h3>
        {(recipeType === 'drinks') ? (
          <p data-testid="recipe-category">{ other }</p>) : null }
        <h3 data-testid="recipe-category">{ category }</h3>
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
  };

  return (
    <main>
      {loading ? <Loading /> : renderDetails() }
    </main>
  );
}

RecipeDetails.propTypes = { pathname: PropTypes.string }.isRequired;

export default RecipeDetails;

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import {
  fetchMealById,
  fetchDrinkById,
  fetchDrinkRecommendation,
  fetchMealRecommendation } from '../services/fetchHelper';
import Loading from '../components/Loading';
import { handleObject, handleRecommendation } from '../services/objectHelper';
import RecipeInfo from '../components/RecipeInfo';
import Carousel from '../components/Carousel';
import DetailsPageButton from '../components/DetailsPageButton';

function RecipeDetails({ location: { pathname } }) {
  const { loading, setLoading } = useContext(AppContext);
  const [recipeData, setRecipeData] = useState({});
  const [recommendationList, setRecommendationList] = useState([]);

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

      const minRecommendationList = handleRecommendation(recommendation);
      const handleRecipe = handleObject(recipeInfo[0], actualRecipeType);
      setRecommendationList(minRecommendationList);
      setRecipeData(handleRecipe);
      setLoading(false);
    };

    getPageInfo();
  }, [pathname, setLoading]);

  const renderDetails = () => (
    <section>
      <RecipeInfo recipeData={ recipeData } />
      <Carousel recommendationList={ recommendationList } />
      <DetailsPageButton recipeData={ recipeData } />
    </section>
  );

  const renderLoading = () => (
    <Loading />
  );

  return (
    <main>
      { (loading) ? renderLoading() : renderDetails() }
    </main>
  );
}

RecipeDetails.propTypes = { pathname: PropTypes.string }.isRequired;

export default RecipeDetails;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import AppContext from '../context/AppContext';
import Loading from '../components/Loading';
import RecipeInfo from '../components/RecipeInfo';
import Carousel from '../components/Carousel';
import DetailsPageButton from '../components/DetailsPageButton';
import { getRecipeDetails } from '../services/objectHelper';
import { saveInProgressRecipe } from '../services/localStorageHelper';

function RecipeDetails({ location: { pathname } }) {
  const {
    loading,
    setLoading,
    checkedIngredients,
    recipeData,
    recommendationList,
    setRecommendationList,
    setRecipeData } = useContext(AppContext);

  useEffect(() => {
    const getPageInfo = async () => {
      setLoading(true);
      const urlData = pathname.split('/');
      console.log(recipeData.id === urlData[2]);
      if (recipeData.id !== undefined || recipeData.id !== urlData[2]) {
        const { minRecommendationList, handleRecipe } = await getRecipeDetails(urlData);
        setRecommendationList(minRecommendationList);
        setRecipeData(handleRecipe);
      }
      setLoading(false);
    };
    getPageInfo();
  }, [pathname, setLoading, setRecipeData, setRecommendationList]);

  useEffect(() => {
    saveInProgressRecipe(recipeData, checkedIngredients);
  }, [checkedIngredients, recipeData]);

  const renderDetails = () => (
    <section>
      <RecipeInfo recipeData={ recipeData } />
      <Carousel recommendationList={ recommendationList } />
      <DetailsPageButton
        recipeData={ recipeData }
      />
    </section>
  );

  const renderLoading = () => (
    <Loading />
  );

  return (
    <Box
      component="main"
      sx={ {
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column' } }
    >
      { (loading) ? renderLoading() : renderDetails() }
    </Box>
  );
}

RecipeDetails.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

export default RecipeDetails;

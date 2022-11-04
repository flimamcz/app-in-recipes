import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import AppContext from '../context/AppContext';
import Loading from '../components/Loading';
import RecipeInfo from '../components/RecipeInfo';
import Carousel from '../components/Carousel';
import DetailsPageButton from '../components/DetailsPageButton';
import { getRecipeDetails } from '../services/objectHelper';

function RecipeDetails({ location: { pathname } }) {
  const { loading, setLoading } = useContext(AppContext);
  const [recipeData, setRecipeData] = useState({});
  const [recommendationList, setRecommendationList] = useState([]);

  useEffect(() => {
    const getPageInfo = async () => {
      setLoading(true);
      const urlData = pathname.split('/');
      const { minRecommendationList, handleRecipe } = await getRecipeDetails(urlData);
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
      <DetailsPageButton
        recipeData={ recipeData }
      />
    </section>
  );

  const renderLoading = () => (
    <Loading />
  );

  return (
    <Box component="main" sx={ { backgroundColor: '#F5F5F5' } }>
      { (loading) ? renderLoading() : renderDetails() }
    </Box>
  );
}

RecipeDetails.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

export default RecipeDetails;

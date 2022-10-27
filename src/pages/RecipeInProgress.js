import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import Loading from '../components/Loading';
import RecipeInfo from '../components/RecipeInfo';
import Carousel from '../components/Carousel';
import DetailsPageButton from '../components/DetailsPageButton';
import { getRecipeDetails } from '../services/objectHelper';
import { saveInProgressRecipe } from '../services/localStorageHelper';

function RecipeInProgress({ location: { pathname } }) {
  const { loading, setLoading, checkedIngredients } = useContext(AppContext);
  const [recipeData, setRecipeData] = useState({});
  const [recommendationList, setRecommendationList] = useState([]);

  useEffect(() => {
    // colocar o recipeData no provider durante a refatoração
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
    <main>
      { (loading) ? renderLoading() : renderDetails() }
    </main>
  );
}

RecipeInProgress.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

export default RecipeInProgress;

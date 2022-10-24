import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { fetchMealById, fetchDrinkById } from '../services/fetchHelper';
import Loading from '../components/Loading';

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

      // if (actualRecipeType === 'meals') {
      //   const recipeInfo = await fetchMealById(recipeId);
      // } else if (actualRecipeType === 'drinks') {
      //   const recipeInfo = await fetchDrinkById(recipeId);
      // }
      setRecipeType(actualRecipeType);
      setRecipeData(recipeInfo);
      setLoading(false);
    };

    getPageInfo();
  }, [pathname, setLoading]);

  return (
    <main>
      {loading ? <Loading /> : <p>{recipeType + recipeData[0].idMeal}</p>}
    </main>
  );
}

RecipeDetails.propTypes = { pathname: PropTypes.string }.isRequired;

export default RecipeDetails;

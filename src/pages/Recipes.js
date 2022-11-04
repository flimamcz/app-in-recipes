import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button } from '@mui/material';
import Card from '../components/Card';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import { fetchGeneric, fetchIngredientFilter } from '../services/fetchHelper';
import Loading from '../components/Loading';
import Btn from '../components/Button';
import Header from '../components/Header';
import helperSlice from '../services/helperSlice';
import toggleReset from '../services/toggleReset';
import AllMeals from '../images/AllMeals.svg';
import AllDrinks from '../images/AllDrinks.svg';

function Recipes({ match }) {
  const [toggleFilter, setToggleFilter] = useState(false);
  const { recipes, setRecipes,
    categoriesFilter,
    setCategoriesFilter } = useContext(AppContext);

  const router = match.path === '/meals' ? '/meals' : '/drinks';
  const sliceTwelve = 12;
  const sliceFive = 5;

  // URLS para recipes padrao
  const urlMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  // Define em qual url buscar as infor
  const DB = router === '/meals' ? 'meal' : 'cocktail';

  // URLS para categorias de recipes

  const urlCategoryMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlCategoryDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  useEffect(() => {
    const requestRecipes = async () => {
      const ENDPOINT = router === '/meals' ? urlMeal : urlDrink;
      const recipesData = await fetchGeneric(ENDPOINT);
      const recipesLengthTwelve = helperSlice(recipesData, sliceTwelve, router);
      setRecipes(recipesLengthTwelve);
    };
    requestRecipes();
  }, [router, setRecipes]);

  useEffect(() => {
    const requestCategories = async () => {
      const ENDPOINT = router === '/meals' ? urlCategoryMeals : urlCategoryDrinks;
      const categories = await fetchGeneric(ENDPOINT);
      const categoriesLengthFive = helperSlice(categories, sliceFive, router);
      setCategoriesFilter(categoriesLengthFive);
    };
    requestCategories();
  }, [setCategoriesFilter, router]);

  const requestAllRecipes = async () => {
    const ENDPOINT = match.path === '/meals' ? urlMeal : urlDrink;
    const recipesData = await fetchGeneric(ENDPOINT);
    const recipesLengthTwelve = helperSlice(recipesData, sliceTwelve, router);
    setRecipes(recipesLengthTwelve);
  };

  const recipesByFilter = async ({ target }) => {
    const element = target.name;
    const requestRecipesByFilter = await fetchIngredientFilter(
      element,
      'filter',
      'c',
      DB,
    );
    const recipesFilter = helperSlice(
      requestRecipesByFilter,
      sliceTwelve,
      router,
    );
    setRecipes(recipesFilter);
    toggleReset(toggleFilter, setToggleFilter, requestAllRecipes);
  };

  return (
    <Box>
      {match.path === '/meals' ? (
        <Header title="Meals" searchImage />
      ) : (
        <Header title="Drinks" searchImage />
      )}
      <Box
        sx={ {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        } }
      >
        <Button
          type="button"
          data-testid="All-category-filter"
          onClick={ requestAllRecipes }
          sx={ {
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
          } }
        >
          <img
            src={ DB === 'meal' ? AllMeals : AllDrinks }
            alt="Icon All recipes"
            width="50"
          />
          <p style={ { paddingTop: '10px', fontSize: '12px' } }>All</p>
        </Button>
        {categoriesFilter.length > 0
          && categoriesFilter.map((category, index) => (
            <Btn
              key={ uuidv4() }
              category={ category }
              onClick={ recipesByFilter }
              index={ index }
              path={ DB }
            />
          ))}
      </Box>
      <div
        className="container-card"
      >
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <Card
              key={ uuidv4() }
              index={ index }
              recipe={ recipe }
              type={ match.path }
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </Box>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default Recipes;

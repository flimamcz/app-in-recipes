import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/Card';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import { fetchGeneric, fetchIngredientFilter } from '../services/fetchHelper';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Header from '../components/Header';
import helperSlice from '../services/helperSlice';

function Recipes({ match }) {
  const [toggleFilter, setToggleFilter] = useState(false);
  const { recipes,
    setRecipes, categoriesFilter, setCategoriesFilter } = useContext(AppContext);

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
    const element = target.innerText;
    const requestRecipesByFilter = await
    fetchIngredientFilter(element, 'filter', 'c', DB);

    const recipesFilter = helperSlice(requestRecipesByFilter, sliceTwelve, router);
    setRecipes(recipesFilter);
  };

  return (
    <div>
      {match.path === '/meals' ? (
        <Header title="Meals" searchImage />
      ) : (
        <Header title="Drinks" searchImage />
      )}
      {categoriesFilter.length > 0
        && categoriesFilter.map((category) => (
          <Button
            key={ uuidv4() }
            category={ category }
            onClick={ recipesByFilter }
          />
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ requestAllRecipes }
      >
        All
      </button>
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
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default Recipes;

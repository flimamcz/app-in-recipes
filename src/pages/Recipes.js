import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/Card';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import { fetchGeneric } from '../services/fetchHelper';
import Loading from '../components/Loading';
import Button from '../components/Button';

function Recipes({ match }) {
  const {
    recipes, setRecipes,
    categoriesFilter, setCategoriesFilter,
  } = useContext(AppContext);

  useEffect(() => {
    const requestRecipes = async () => {
      const urlMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const ENDPOINT = match.path === '/meals' ? urlMeal : urlDrink;
      const lengthRecipes = 12;
      const recipesData = await fetchGeneric(ENDPOINT);
      const recipesLengthTwelve = match.path === '/meals'
        ? recipesData.meals.slice(0, lengthRecipes)
        : recipesData.drinks.slice(0, lengthRecipes);
      setRecipes(recipesLengthTwelve);
    };
    requestRecipes();
  }, [setRecipes, match.path]);

  useEffect(() => {
    const requestCategories = async () => {
      const urlCategoryMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const urlCategoryDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const ENDPOINT = match.path === '/meals' ? urlCategoryMeals : urlCategoryDrinks;
      const lengthRecipes = 5;
      const categories = await fetchGeneric(ENDPOINT);
      const categoriesLengthFive = match.path === '/meals'
        ? categories.meals.slice(0, lengthRecipes)
        : categories.drinks.slice(0, lengthRecipes);
      setCategoriesFilter(categoriesLengthFive);
    };
    requestCategories();
  }, [match.path, setCategoriesFilter]);

  return (
    <div>
      <h3>Recipes</h3>
      {recipes.length > 0 ? recipes.map((recipe, index) => (
        <Card
          key={ uuidv4() }
          index={ index }
          recipe={ recipe }
          type={ match.path }
        />
      )) : <Loading />}
      {categoriesFilter.length > 0 && categoriesFilter.map((category) => (
        <Button key={ uuidv4() } category={ category } />
      ))}
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

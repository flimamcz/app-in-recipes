import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/Card';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import { fetchGeneric } from '../services/fetchHelper';
import Loading from '../components/Loading';

function Recipes({ match }) {
  const { recipes, setRecipes } = useContext(AppContext);

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

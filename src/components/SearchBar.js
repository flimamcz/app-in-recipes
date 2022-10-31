import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchIngredientFilter,
} from '../services/fetchHelper';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { handleChangeSearch, searchInput, setRecipes } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const max = 12;

  const ingredientAPI = async (ele, type, letter, db) => {
    const data = await fetchIngredientFilter(ele, type, letter, db);
    if (db === 'meal') {
      if (!data.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (data.meals.length === 1) {
        history.push(`/meals/${data.meals[0].idMeal}`);
      } else {
        const TwelveMeals = data.meals.slice(0, max);
        setRecipes(TwelveMeals);
      }
    } else if (db === 'cocktail') {
      if (!data.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      } else {
        const TwelveDrinks = data.drinks.slice(0, max);
        setRecipes(TwelveDrinks);
      }
    }
  };

  const barFilter = (path) => {
    switch (searchInput.filter) {
    case 'ingredient':
      return ingredientAPI(searchInput.search, 'filter', 'i', path);
    case 'Name':
      return ingredientAPI(searchInput.search, 'search', 's', path);
    case 'First letter':
      if (searchInput.search.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return ingredientAPI(searchInput.search, 'search', 'f', path);
    default:
    }
  };
  const handleSearchClick = () => {
    if (pathname === '/meals') { barFilter('meal'); }
    if (pathname === '/drinks') { barFilter('cocktail'); }
  };

  return (
    <form>
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          value="ingredient"
          name="filter"
          data-testid="ingredient-search-radio"
          onChange={ handleChangeSearch }
        />
        Ingredient
      </label>
      <label htmlFor="Name">
        <input
          type="radio"
          id="Name"
          value="Name"
          name="filter"
          data-testid="name-search-radio"
          onChange={ handleChangeSearch }
        />
        Name
      </label>
      <label htmlFor="First letter">
        <input
          type="radio"
          id="First letter"
          value="First letter"
          name="filter"
          data-testid="first-letter-search-radio"
          onChange={ handleChangeSearch }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Pesquisar
      </button>
    </form>
  );
}

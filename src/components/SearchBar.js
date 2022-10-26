import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchIngredientFilter,
} from '../services/fetchHelper';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { HandleChangeSearch, searchInput, setRecipes } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const IngredientAPI = async (ele, type, letter, db) => {
    const data = await fetchIngredientFilter(ele, type, letter, db);
    if (db === 'meal') {
      if (data.meals.length === 1) {
        history.push(`/meals/${data.meals[0].idMeal}`);
      }
      setRecipes(data.meals);
    } else if (db === 'cocktail') {
      if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idMeal}`);
      }
      setRecipes(data.drinks);
    }
  };
  const barFilter = (path) => {
    switch (searchInput.filter) {
    case 'ingredient':
      return IngredientAPI(searchInput.search, 'filter', 'i', path);
    case 'Name':
      return IngredientAPI(searchInput.search, 'search', 's', path);
    case 'First letter':
      if (searchInput.search.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return IngredientAPI(searchInput.search, 'search', 'f', path);
    default: return [];
    }
  };
  const handleSearchClick = () => {
    if (pathname === '/meals') { barFilter('meal'); }
    if (pathname === '/drinks') { barFilter('cocktail'); }
  };

  return (
    <div>
      <h3>SearchBar</h3>
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          value="ingredient"
          name="filter"
          data-testid="ingredient-search-radio"
          onChange={ HandleChangeSearch }
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
          onChange={ HandleChangeSearch }
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
          onChange={ HandleChangeSearch }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Search
      </button>
    </div>
  );
}

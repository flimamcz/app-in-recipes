import React, { useContext } from 'react';
import {
  fetchIngredientFilter,
} from '../services/fetchHelper';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { HandleChangeSearch, searchInput, setRecipes } = useContext(AppContext);

  const IngredientAPI = async (ele, type, letter) => {
    const data = await fetchIngredientFilter(ele, type, letter);
    console.log(data);
    setRecipes(data);
  };
  const handleSearchClick = () => {
    switch (searchInput.filter) {
    case 'ingredient':
      IngredientAPI(searchInput.search, 'filter', 'i');
      break;
    case 'Name':
      IngredientAPI(searchInput.search, 'search', 's');
      break;
    case 'First letter':
      if (searchInput.search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        IngredientAPI(searchInput.search, 'search', 'f');
      }
      break;
    default: return null;
    }
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

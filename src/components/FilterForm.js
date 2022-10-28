import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterForm() {
  const { setStorageFilter } = useContext(AppContext);

  const handleClick = ({ target: { name } }) => {
    if (name === 'all') {
      setStorageFilter('');
    } else (setStorageFilter(name));
  };

  return (

    <form
      name="filters"
    >
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
      >
        Meals
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>
    </form>
  );
}

export default FilterForm;

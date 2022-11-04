import { Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import allLogo from '../images/allLogo.svg';
import AllDrinks from '../images/AllDrinks.svg';
import AllMeals from '../images/AllMeals.svg';

function FilterForm() {
  const { setStorageFilter } = useContext(AppContext);

  const handleClick = ({ target: { name, innerHTML } }) => {
    if (name === 'all' || innerHTML.toLowerCase() === 'all') {
      setStorageFilter('');
    } else (setStorageFilter(name || innerHTML.toLowerCase()));
  };

  return (

    <Box
      sx={ { display: 'flex', width: '100%', justifyContent: 'space-evenly' } }
      name="filters"
    >
      <Button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
        sx={ {
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <img
          src={ allLogo }
          alt="Icon All recipes"
          width="50"
          name="all"
        />
        <p style={ { paddingTop: '10px', fontSize: '12px' } }>All</p>
      </Button>

      <Button
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
        sx={ {
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <img
          src={ AllMeals }
          alt="Icon All recipes"
          width="50"
          name="meal"
        />
        <p style={ { paddingTop: '10px', fontSize: '12px' } }>Meal</p>
      </Button>

      <Button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
        sx={ {
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <img
          src={ AllDrinks }
          alt="Icon drinks recipes"
          width="50"
          name="all"
        />
        <p style={ { paddingTop: '10px', fontSize: '12px' } }>Drink</p>
      </Button>
    </Box>
  );
}

export default FilterForm;

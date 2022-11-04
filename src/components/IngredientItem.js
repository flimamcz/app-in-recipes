import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, ListItem } from '@mui/material';

function IngredientItem({ ingredient, index, handleCheck, checkedIngredients }) {
  const [page, setPage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const isInProgressPage = history.location.pathname.split('/')[3];
    if (isInProgressPage) {
      setPage('IN_PROGRESS');
    }
  }, [history]);

  const checkChecked = () => checkedIngredients.some((item) => item === index);

  return (
    <ListItem
      name="ingredient-name-and-measure"
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {(page === 'IN_PROGRESS') ? (
        <FormControlLabel
          className={ checkChecked() ? 'selected' : '' }
          data-testid={ `${index}-ingredient-step` }
          control={
            <Checkbox
              id={ index.toString() }
              checked={ checkChecked() }
              onChange={ handleCheck }
            />
          }
          label={ ingredient }
        />
      ) : (
        <span>
          {ingredient}
        </span>)}
    </ListItem>
  );
}

IngredientItem.propTypes = {
  ingredient: PropTypes.string,
  index: PropTypes.number,
  handleCheck: PropTypes.func,
}.isRequired;

export default IngredientItem;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <li
      name="ingredient-name-and-measure"
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {(page === 'IN_PROGRESS') ? (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ index }
          className={ checkChecked() ? 'selected' : '' }
        >
          <input
            id={ index }
            type="checkbox"
            checked={ checkChecked() }
            onChange={ handleCheck }
          />
          <span>
            {ingredient}
          </span>
        </label>
      ) : (
        <span>
          {ingredient}
        </span>)}
    </li>
  );
}

IngredientItem.propTypes = {
  ingredient: PropTypes.string,
  index: PropTypes.number,
  handleCheck: PropTypes.func,
}.isRequired;

export default IngredientItem;

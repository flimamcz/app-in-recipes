import PropTypes from 'prop-types';
import React from 'react';

function Button({ category, onClick }) {
  return (
    <button
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ onClick }
    >
      {category.strCategory}
    </button>
  );
}

Button.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string,
  }),
  onClick: PropTypes.func,
}.isRequired;

export default Button;

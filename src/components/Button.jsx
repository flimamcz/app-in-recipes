import PropTypes from 'prop-types';
import React from 'react';

function Button({ category }) {
  return (
    <button type="button" data-testid={ `${category.strCategory}-category-filter` }>
      {category.strCategory}
    </button>
  );
}

Button.propTypes = {
  category: PropTypes.shape({ strCategory: PropTypes.string }).isRequired,
};

export default Button;

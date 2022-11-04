import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@mui/material';
import providerIcons from '../services/providerIcons';

function Btn({ category, onClick, index, path }) {
  return (
    <div>
      <Button
        name={ category.strCategory }
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
        onClick={ onClick }
        sx={ {
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <img
          src={ providerIcons(path)[index] }
          name={ category.strCategory }
          alt="icon category"
          width={ 50 }
        />
        <p
          style={ { paddingTop: '10px', fontSize: '10px' } }
        >
          {category.strCategory}
        </p>
      </Button>
    </div>
  );
}

Btn.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string,
  }),
  onClick: PropTypes.func,
}.isRequired;

export default Btn;

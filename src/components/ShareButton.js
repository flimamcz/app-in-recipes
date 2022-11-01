import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ recipeData: { id, type }, testid }) {
  const { location: { pathname } } = useHistory();
  const [copyMessage, setCopyMessage] = useState(false);
  const handleUrl = () => {
    const href = window.location.href.split('/');
    if (pathname === '/favorite-recipes' || pathname === '/done-recipes') {
      const urlLetterS = `${href[0]}//${href[2]}/${type}s/${id}`;
      copy(urlLetterS);
    } else {
      const url = `${href[0]}//${href[2]}/${type}/${id}`;
      copy(url);
    }
    setCopyMessage(true);
  };

  return (
    <section>
      <button
        type="button"
        data-testid={ testid }
        src={ shareIcon }
        onClick={ handleUrl }
      >
        <img src={ shareIcon } alt="shareImage" />
      </button>
      { copyMessage && <span>Link copied!</span>}
    </section>
  );
}

ShareButton.defaultProps = {
  testid: 'share-btn',
};

ShareButton.propTypes = {
  testid: PropTypes.string,
  recipeData: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }),
}.isRequired;

export default ShareButton;

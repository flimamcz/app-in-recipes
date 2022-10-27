import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copyMessage, setCopyMessage] = useState(false);
  const history = useHistory();

  const handleUrl = () => {
    const isInProgressPage = history.location.pathname.split('/')[3];
    const url = (isInProgressPage) ? (
      (window.location.href).split('/in-progress')[0]) : (window.location.href);
    copy(url);
    setCopyMessage(true);
  };

  return (
    <div>

      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ handleUrl }
      >
        <img src={ shareIcon } alt="shareImage" />
      </button>
      { copyMessage && <span>Link copied!</span>}
    </div>
  );
}

export default ShareButton;

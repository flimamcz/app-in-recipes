import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../context/Provider';
import App from '../../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <Provider>
        <App />
      </Provider>
    </Router>,
  );
  return { ...resources, history };
};

export default renderPath;

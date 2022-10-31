import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderPath from './helpers/renderPath';

describe('Testar componentes da tela Profile.js', () => {
  it('testa botoes e funcionaçidades', () => {
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
  });
  const title = screen.getByTestId('Profile');
  const emailInput = screen.getByTestId('email-input');
  const btnDone = screen.getByTestId('profile-done-btn');
  const btnFavorite = screen.getByTestId('profile-favorite-btn');
  const btnLogout = screen.getByTestId('profile-logout-btn');

  expect(title && emailInput && btnDone && btnFavorite
      && btnLogout).toBeInTheDocument();
  userEvent.type(emailInput, 'alguem@alguem.com.br');
  userEvent.click(btnDone);
  userEvent.click(btnFavorite);
  userEvent.click(btnLogout);
});

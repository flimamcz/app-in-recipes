import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderPath from './helpers/renderPath';

describe('Testar componentes da tela Profile.js', () => {
  it('testa botoes e funcionaçidades', () => {
    const { history } = renderPath(<App />);
    const loginInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });
    userEvent.type(loginInput, 'trybe@teste.com');
    userEvent.type(passwordInput, 'jdeiwjdiew');
    userEvent.click(enterBtn);
    act(() => {
      history.push('/profile');
    });

    const title = screen.getByRole('heading', {
      name: /profile/i,
    });
    const email = screen.getByTestId('profile-email');
    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(title && email && btnDone && btnFavorite
      && btnLogout).toBeInTheDocument();

    userEvent.click(btnDone);

    expect(history.location.pathname).toBe('/done-recipes');

    act(() => {
      history.push('/profile');
    });

    expect(history.location.pathname).toBe('/profile');
    const Favorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(Favorite);

    expect(history.location.pathname).toBe('/favorite-recipes');

    act(() => {
      history.push('/profile');
    });

    expect(history.location.pathname).toBe('/profile');
    const Logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(Logout);
    expect(history.location.pathname).toBe('/');
  });
});

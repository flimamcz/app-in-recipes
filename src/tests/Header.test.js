import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';

describe('Testa componente Header', () => {
  test('teste o Header em /meals', () => {
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
    const title = screen.getByRole('heading', {
      name: /meals/i,
    });
    const ProfileBtn = screen.getByRole('button', {
      name: /profile/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });
    expect(title).toBeInTheDocument();
    expect(ProfileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(ProfileBtn);
    expect(history.location.pathname).toBe('/profile');
  });
});

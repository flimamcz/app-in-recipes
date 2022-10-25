import React from 'react';
import { act, screen } from '@testing-library/react';
import renderPath from './helpers/renderPath';
import App from '../App';

describe('Testa componente Recipes', () => {
  it('Verifica se tem o texto Recipes na tela', async () => {
    const { history } = renderPath(<App />);
    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();

    act(() => {
      history.push('/meals');
    });
    const titleMeals = screen.getByRole('heading', { name: /recipes/i });
    expect(titleMeals).toBeInTheDocument();
    const buttonProfile = screen.getByRole('button', { name: /profile/i });
    expect(buttonProfile).toBeInTheDocument();
    const buttonChicken = await screen.findByRole('button', { name: /chicken/i });
    expect(buttonChicken).toBeInTheDocument();
  });
});

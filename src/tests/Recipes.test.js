import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import helperSlice from '../services/helperSlice';
import meals from '../../cypress/mocks/meals';

const sliceTwelve = 12;

describe('Testa componente Recipes', () => {
  it('Verifica se tem o texto Recipes na tela e botoes', async () => {
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
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });

  it('Verifica se existe o botão chamado Beef e All', async () => {
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/');
    });

    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();

    act(() => {
      history.push('/meals');
    });

    const titleRecipes = screen.getByText(/recipes/i);
    expect(titleRecipes).toBeInTheDocument();

    await waitFor(async () => {
      const buttonBeef = await screen.findByRole('button', { name: /beef/i });
      expect(buttonBeef).toBeInTheDocument();
      userEvent.click(buttonBeef);
      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
    });
  });

  it('Testa função helper slice', () => {
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals');
    });

    const router = history.location.pathname;
    const sliced = helperSlice(meals, sliceTwelve, router);
    expect(sliced.length).toBe(12);
  });
});

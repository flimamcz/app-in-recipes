import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import renderPath from './helpers/renderPath';
import App from '../App';
import helperSlice from '../services/helperSlice';
import meals from '../../cypress/mocks/meals';

const sliceTwelve = 12;

describe('Testa componente Recipes', () => {
  it('Verifica se renderiza os botões SEARCH e PROFILE na tela de recipes', async () => {
    const { history } = renderPath(<App />);
    expect(history.location.pathname).toBe('/');

    act(() => {
      history.push('/meals');
    });

    expect(screen.getByText(/recipes/i)).toBeInTheDocument();
    const iconSearch = screen.getByRole('img', { name: /search icon/i });
    const buttonProfile = screen.getByRole('button', { name: /profile/i });
    expect(buttonProfile).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
  });

  it('Verifica se encontra o texto AYAM PERCIK após clicar no botão chicken', async () => {
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(async () => {
      const buttonChicken = screen.getByRole('button', { name: /chicken/i });
      expect(buttonChicken).toBeInTheDocument();
      userEvent.click(buttonChicken);

      const firstRecipes = screen.findByRole('heading', { name: /ayam percik/i });
      expect(firstRecipes);
    }, { timeout: 4000 });
  });

  it('Testa botão All', async () => {
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(async () => {
      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
    }, { timeout: 3000 });
  });

  it('Testa função helperSlice', () => {
    const router = '/meals';
    const recipesSliced = helperSlice(meals, sliceTwelve, router);
    expect(recipesSliced.length).toBe(12);
  });
});

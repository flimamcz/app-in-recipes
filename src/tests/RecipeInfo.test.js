import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testa o componente RecipeDetails', () => {
  test('Verifica se o componente RecipeInfo renderiza os componentes no caminho /meals/id', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals/52771');
    });

    expect(history.location.pathname).toBe('/meals/52771');

    const recipePhoto = await screen.findByRole('img', { name: /recipeimage/i });
    const recipeTitle = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    const recipeCategory = await screen.findByRole('heading', { name: /vegetarian/i });
    const recipeIngredients = await screen.findByRole('list');
    const recipeItens = await screen.findAllByRole('listitem');
    const recipeInstructions = await screen.findByTestId('instructions');
    const recipeVideo = await screen.findByTestId('video');
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    // const recipeAlcooholic = await screen.findByText(/alcoholic/i);

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredients).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeItens).toHaveLength(8);
    expect(recipeVideo).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(startBtn);
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  test('Verifica se o componente RecipeInfo renderiza os componentes corretos no caminho /drinks/id', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/drinks/178319');
    });

    expect(history.location.pathname).toBe('/drinks/178319');

    const recipePhoto = await screen.findByRole('img', { name: /recipeimage/i });
    const recipeTitle = await screen.findByRole('heading', { name: /aquamarine/i });
    const recipeCategory = await screen.findByRole('heading', { name: /cocktail/i });
    const recipeIngredients = await screen.findByRole('list');
    const recipeItens = await screen.findAllByRole('listitem');
    const recipeInstructions = await screen.findByTestId('instructions');
    const recipeAlcooholic = await screen.findByText(/alcoholic/i);
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredients).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeItens).toHaveLength(3);
    expect(recipeAlcooholic).toBeInTheDocument();

    expect(startBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(startBtn);
    });

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});

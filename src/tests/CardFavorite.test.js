import React from 'react';
import { act, screen } from '@testing-library/react';
import renderPath from './helpers/renderPath';
import App from '../App';
import doneRecipesData from './helpers/doneRecipesData';

describe('Testa o componente CardFavorite', () => {
  test('Verifica se o componente RecipeInfo renderiza todos elementos corretamente', async () => {
    const { history } = renderPath(<App />);

    global.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesData));

    act(() => {
      history.push('/done-recipes');
    });

    expect(history.location.pathname).toBe('/done-recipes');

    const firstImage = screen.getByRole('img', { name: /teriyaki chicken casserole/i });
    const firstText = screen.getByText(/japanese - chicken/i);
    const firstName = screen.getByText(/teriyaki chicken casserole/i);
    const tagOne = screen.getByText(/meat/i);
    const firstDoneDate = screen.getByText(/2022-10-31t19:34:47\.754z/i);
    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');

    expect(firstImage).toBeInTheDocument();
    expect(firstText).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(tagOne).toBeInTheDocument();
    expect(firstDoneDate).toBeInTheDocument();
    expect(firstShareBtn).toBeInTheDocument();

    const secondImage = screen.getByRole('img', { name: /margarita/i });
    const secondText = screen.getByText(/alcoholic/i);
    const secondName = screen.getByText(/margarita/i);
    const secondOne = screen.getByText(/meat/i);
    const secondDoneDate = screen.getByText(/2022-10-31t19:34:58\.432z/i);
    const secondShareBtn = screen.getByTestId('1-horizontal-share-btn');

    expect(secondImage).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
    expect(secondName).toBeInTheDocument();
    expect(secondOne).toBeInTheDocument();
    expect(secondDoneDate).toBeInTheDocument();
    expect(secondShareBtn).toBeInTheDocument();
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import favoriteRecipesData from './helpers/favoriteRecipesData';

describe('Testa a página de Receitas Favoritas', () => {
  test('Verifica se o componente RecipeInfo renderiza todos elementos corretamente', async () => {
    const { history } = renderPath(<App />);

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesData));

    act(() => {
      history.push('/favorite-recipes');
    });

    expect(history.location.pathname).toBe('/favorite-recipes');

    const mealImage = screen.getByText(/teriyaki chicken casserole/i);
    const drinkImage = screen.getByRole('img', { name: /margarita/i });

    expect(mealImage).toBeInTheDocument();
    expect(drinkImage).toBeInTheDocument();

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();

    const mealsBtn = screen.getByRole('button', {
      name: /meals/i,
    });
    expect(mealsBtn).toBeInTheDocument();

    const drinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    expect(drinksBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(drinksBtn);
    });

    const drinkFilter = screen.getByRole('img', {
      name: /margarita/i,
    });
    expect(drinkFilter).toBeInTheDocument();

    act(() => {
      userEvent.click(mealsBtn);
    });

    const mealFilter = screen.getByRole('img', { name: /teriyaki chicken casserole/i });
    expect(mealFilter).toBeInTheDocument();

    act(() => {
      userEvent.click(allBtn);
    });

    const allFilterOne = screen.getByRole('img', { name: /teriyaki chicken casserole/i });
    const allFilterTwo = screen.getByRole('img', {
      name: /margarita/i });

    expect(allFilterOne).toBeInTheDocument();
    expect(allFilterTwo).toBeInTheDocument();
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import renderPath from './helpers/renderPath';
import App from '../App';

describe('Testa componente Footer', () => {
  it('Verifica se existe duas imagens na tela', () => {
    const { history } = renderPath(<App />);
    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();

    act(() => {
      history.push('/meals');
    });

    const titleRecipes = screen.getByRole('heading', { name: /recipes/i });
    const iconDrink = screen.getByRole('img', { name: /icone representando um drink/i });
    const iconMeal = screen.getByRole('img', { name: /icone representando comidas/i });
    expect(titleRecipes).toBeInTheDocument();
    expect(iconDrink).toBeInTheDocument();
    expect(iconMeal).toBeInTheDocument();
  });
});

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
      history.push('/profile');
    });

    const iconDrink = screen.getByRole('img', { name: /icone representando um drink/i });
    const iconMeal = screen.getByRole('img', { name: /icone representando comidas/i });
    expect(iconDrink).toBeInTheDocument();
    expect(iconMeal).toBeInTheDocument();
  });
});

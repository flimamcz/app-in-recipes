import React from 'react';
import { act, screen } from '@testing-library/react';
import renderPath from './helpers/renderPath';
import App from '../App';

describe('Testa componente Recipes', () => {
  it('Verifica se tem o texto Recipes na tela', () => {
    const { history } = renderPath(<App />);
    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();

    act(() => {
      history.push('/meals');
    });
  });
});

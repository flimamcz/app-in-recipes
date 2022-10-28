import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testa o componente FavoriteButton', () => {
  test('Testa as funções de favoritar', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals/52771');
    });

    expect(history.location.pathname).toBe('/meals/52771');

    const favBtn = await screen.findByRole('button', { name: /favlogo/i });
    expect(favBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(favBtn);
    });

    act(() => {
      userEvent.click(favBtn);
    });
  });
});

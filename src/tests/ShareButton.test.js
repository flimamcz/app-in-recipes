import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testa o componente ShareButton', () => {
  test('Testa as funções de compartilhar', async () => {
    global.fetch = jest.fn(fetch);
    window.document.execCommand = jest.fn(() => true);
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals/52771');
    });

    expect(history.location.pathname).toBe('/meals/52771');

    const shareBtn = await screen.findByRole('button', { name: /shareimage/i });
    act(() => {
      userEvent.click(shareBtn);
    });
    const copyMessage = await screen.findByText(/link copied!/i);

    expect(copyMessage).toBeInTheDocument();

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(startBtn);
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const inProgressStartBtn = await screen.findByRole('button', { name: /shareimage/i });

    expect(inProgressStartBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(inProgressStartBtn);
    });

    const inProgressCopyMessage = await screen.findByText(/link copied!/i);

    expect(inProgressCopyMessage).toBeInTheDocument();
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testa o componente Carousel', () => {
  test('Testa o funcionamento dos botões do carousel', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);

    act(() => {
      history.push('/meals/52771');
    });

    expect(history.location.pathname).toBe('/meals/52771');

    const carousel = await screen.findByRole('article');
    const carouselBackButton = await screen.findByRole('button', { name: /back/i });
    const carouselNextButton = await screen.findByRole('button', { name: /next/i });
    const recomendationsCard1 = await screen.findByTestId('0-recommendation-card');
    const recomendationsCard4 = await screen.findByTestId('3-recommendation-card');
    const recomendationsCard5 = await screen.findByTestId('4-recommendation-card');

    expect(carousel).toBeInTheDocument();
    expect(carouselBackButton).toBeInTheDocument();
    expect(carouselNextButton).toBeInTheDocument();
    expect(recomendationsCard1).toBeInTheDocument();
    expect(recomendationsCard4).toBeInTheDocument();
    expect(recomendationsCard5).toBeInTheDocument();

    expect(recomendationsCard1).toBeVisible();
    expect(recomendationsCard4).not.toBeVisible();
    expect(recomendationsCard5).not.toBeVisible();

    userEvent.click(carouselNextButton);
    expect(recomendationsCard1).not.toBeVisible();
    expect(recomendationsCard4).toBeVisible();
    expect(recomendationsCard5).not.toBeVisible();

    userEvent.click(carouselNextButton);
    expect(recomendationsCard1).not.toBeVisible();
    expect(recomendationsCard4).not.toBeVisible();
    expect(recomendationsCard5).toBeVisible();
    userEvent.click(carouselNextButton);

    expect(recomendationsCard1).toBeVisible();
    expect(recomendationsCard4).not.toBeVisible();
    expect(recomendationsCard5).not.toBeVisible();

    userEvent.click(carouselBackButton);
    expect(recomendationsCard1).not.toBeVisible();
    expect(recomendationsCard4).not.toBeVisible();
    expect(recomendationsCard5).toBeVisible();

    userEvent.click(carouselBackButton);
    expect(recomendationsCard1).not.toBeVisible();
    expect(recomendationsCard4).toBeVisible();
    expect(recomendationsCard5).not.toBeVisible();

    userEvent.click(carouselBackButton);
    expect(recomendationsCard1).toBeVisible();
    expect(recomendationsCard4).not.toBeVisible();
    expect(recomendationsCard5).not.toBeVisible();
  });
});

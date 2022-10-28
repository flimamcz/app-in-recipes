import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testa componente SearchBar em Meals', () => {
  test('teste os componentes SearchBar em /meals e faz uma pesquisa de ingrediente beef', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBarTitle = screen.getByRole('heading', {
      name: /searchbar/i,
    });
    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    const ingText = screen.getByText(/ingredient/i);
    const nameText = screen.getByText(/name/i);
    const letterText = screen.getByText(/first letter/i);
    expect(ingText).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(letterText).toBeInTheDocument();
    expect(searchBarTitle).toBeInTheDocument();
    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'Chicken');
    expect(searchInput.value).toBe('Chicken');
    userEvent.click(radioIng);
    expect(radioIng).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledTimes(3);
    const chicken = await screen.findByRole('heading', {
      name: /brown stew chicken/i,
    }, { timeout: 3000 });
    expect(chicken).toBeInTheDocument();
  }, 8000);

  test('testa API para radio Name', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'soup');
    expect(searchInput.value).toBe('soup');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledTimes(3);
    const soup = await screen.findByRole('heading', {
      name: /leblebi soup/i,
    }, { timeout: 3000 });
    expect(soup).toBeInTheDocument();
  }, 8000);

  test('testa API para 1 receita encontrada', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'Arrabiata');
    expect(searchInput.value).toBe('Arrabiata');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledTimes(3);
    const arrabiata = await screen.findByRole('button', {
      name: /favlogo/i,
    }, { timeout: 3000 });
    expect(arrabiata).toBeInTheDocument();
  }, 8000);

  test('testa alert para 0 receitas', async () => {
    global.fetch = jest.fn(fetch);
    global.alert = jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'xablau');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();
    userEvent.click(searchBtn);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    userEvent.click(radioLetter);
    userEvent.click(searchBtn);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
describe('Testa componente SearchBar em drinks', () => {
  test('teste os componentes SearchBar em /drinks e faz uma pesquisa de ingrediente', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchBarTitle = screen.getByRole('heading', {
      name: /searchbar/i,
    });
    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    const ingText = screen.getByText(/ingredient/i);
    const nameText = screen.getByText(/name/i);
    const letterText = screen.getByText(/first letter/i);
    expect(ingText).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(letterText).toBeInTheDocument();
    expect(searchBarTitle).toBeInTheDocument();
    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'Light rum');
    expect(searchInput.value).toBe('Light rum');
    userEvent.click(radioIng);
    expect(radioIng).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledTimes(5);
    const florida = await screen.findByRole('heading', {
      name: /151 Florida Bushwacker/i,
    }, { timeout: 3000 });
    expect(florida).toBeInTheDocument();
  }, 8000);

  test('testa API para radio Name', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/drinks');
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'gin');
    expect(searchInput.value).toBe('gin');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledTimes(3);
    const gin = await screen.findByRole('heading', {
      name: /gin fizz/i,
    }, { timeout: 3000 });
    expect(gin).toBeInTheDocument();
  }, 8000);

  test('testa API para 1 receita encontrada', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/drinks');
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'Aquamarine');
    expect(searchInput.value).toBe('Aquamarine');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toBeCalledTimes(3);
    const Aquamarine = await screen.findByRole('button', {
      name: /favlogo/i,
    }, { timeout: 3000 });
    expect(Aquamarine).toBeInTheDocument();
  }, 8000);
  test('testa alert para 0 receitas', async () => {
    global.fetch = jest.fn(fetch);
    global.alert = jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/drinks');
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    const searchIconBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'xablau');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();
    userEvent.click(searchBtn);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    userEvent.click(radioLetter);
    userEvent.click(searchBtn);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});

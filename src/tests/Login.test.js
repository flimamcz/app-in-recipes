import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import renderWithRouter from './helpers/renderPath';
// import Login from '../pages/Login';
import App from '../App';
import renderPath from './helpers/renderPath';
// import Login from '../pages/Login';

// const emailTest = 'cristiane@samaan.com.br';
// const passwordTest = '80128012';

describe('Testar componentes da tela de Login', () => {
  // const emailInput = screen.getByTestId('email-input');
  // const password = screen.getByTestId('password-input');
  // const btnLogin = screen.getByTestId('login-submit-btn');
  it('verifica se os inputs e o botão está na tela', () => {
    const { history } = renderPath(<App />);
    act(() => {
      history.push('/meals');
    });
    const title = screen.getByText('Meals');
    expect(title).toBeInTheDocument();
  });

  it('verifica se os inputs redenrizam na tela', () => {
    const { history } = renderPath('/');
    const emailInput = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();
    userEvent.type(emailInput, 'alguem@alguem.com.br');
    userEvent.type(password, '12348888');
    expect(btnLogin).toBeEnabled();
    userEvent.click(btnLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});

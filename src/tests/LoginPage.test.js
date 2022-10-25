import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';

// const validName = 'cristianeKizlevicius';
// const validEmail = 'cristiane@samaan.com.br';

describe('Testes da Página Login', () => {
  it('verifica se há um campo de entrada para email e senha', () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputLogin = screen.getByTestId('password-input');
    expect(inputLogin).toBeInTheDocument();
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
  });
});

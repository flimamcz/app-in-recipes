import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Login() {
  const {
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
    email,
  } = useContext(AppContext);
  const history = useHistory();

  const validaEmailPassword = useCallback(() => {
    const CHARAC_MIN = 6;
    const regex = /\S+@\S+\.\S+/;
    const validaEmail = regex.test(email);
    const validaPassword = password.length > CHARAC_MIN;
    const validarInputs = !(validaEmail && validaPassword);
    setIsDisabled(validarInputs);
  }, [email, password, setIsDisabled]);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };
  const clickSubmit = useCallback(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktaislToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  }, [email, history]);

  useEffect(() => {
    validaEmailPassword();
  }, [email, password, validaEmailPassword]);

  return (
    <main>
      <form>
        <h2 className="title-login">Login</h2>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          <input
            className="w-100"
            type="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
            placeholder="Digite sua senha"
          />
        </label>
        <button
          type="button"
          className="btn-login"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ clickSubmit }
        >
          Enter
        </button>

      </form>
    </main>

  );
}

export default Login;

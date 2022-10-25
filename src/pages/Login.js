import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

// import PropTypes from 'prop-types';

function Login() {
  const {
    setEmail,
    password, setPassword, isDisabled, setIsDisabled, email } = useContext(AppContext);
  const history = useHistory();

  const validaEmailPassword = useCallback(() => {
    // const { email, password } = user;
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
    const emailEstorage = { email };
    localStorage.setItem('user', JSON.stringify({ emailEstorage }));
    history.push('/meals');
  }, [email, history]);

  useEffect(() => {
    validaEmailPassword();
  }, [email, password, validaEmailPassword]);

  return (
    <section>
      <form>
        <h2 className="title-login">Login</h2>
        <section className="section-input-login">
          <input
            type="email"
            // value={ email }
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ handleChangeEmail }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
            placeholder="Digite sua senha"
            // value={ password }
          />
        </section>
        <section className="section-button-login">
          <button
            type="button"
            className="btn-login"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ clickSubmit }
          >
            Enter
          </button>
        </section>

      </form>
    </section>
  );
}

export default Login;

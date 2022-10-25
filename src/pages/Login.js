import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Login() {
  const history = useHistory();
  const { email,
    setEmail,
    password,
    setPassword,
    disabled,
    setDisabled } = useContext(AppContext);

  const validInput = () => {
    const characterLength = 6;
    const regex = /\S+@\S+\.\S+/;
    const testEmail = email && regex.test(email);
    const testPassword = password.length > characterLength;
    if (testEmail && testPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    };

    useEffect(() => {
      validInput();
    });
  

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };


  return (
    <section>
      <form>
        <h2 className="title-login">Login</h2>
        <section className="section-input-login">
          <input
            type="Email"
            value={ email }
            data-testid="email-input"
            placeholder="Digite se email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (({ target }) => setPassword(target.value)) }
          />
        </section>
        <section className="section-button-login">
          <button
            type="button"
            className="btn-login"
            data-testid="login-submit-btn"
            disable={ disabled }
            onClick={ handleClick }
          >
            Enter
          </button>
        </section>

      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;

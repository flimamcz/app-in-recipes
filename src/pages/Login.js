import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
// import PropTypes from 'prop-types';

function Login() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <h3>Login</h3>
      <p>{state}</p>
    </div>
  );
}

// Login.propTypes = { key: PropTypes.type};

export default Login;

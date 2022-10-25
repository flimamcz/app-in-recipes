import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisabled] = useState(true);

  const contextValue = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      disable,
      setDisabled,
    }),
    [
      disable,
      email,
      password,
    ],
  );

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Provider;

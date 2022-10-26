import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState('true');

  const contextValue = useMemo(
    () => ({

      email,
      setEmail,
      password,
      setPassword,
      user,
      setUser,
      isDisabled,
      setIsDisabled,
      loading,
      setLoading,

    }),
    [email, password, user, isDisabled, loading],
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

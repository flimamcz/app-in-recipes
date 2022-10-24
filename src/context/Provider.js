import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [state, setState] = useState('');
  const [loading, setLoading] = useState('true');

  const contextValue = useMemo(() => ({
    state,
    setState,
    loading,
    setLoading,
  }), [state, loading]);

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

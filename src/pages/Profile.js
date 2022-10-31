import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';// import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Profile() {
  const history = useHistory();
  const [emailProfile, setEmailProfile] = useState('');
  const { setEmail } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.clear();
    setEmail('');
    history.push('/');
  };

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmailProfile(userEmail);
    }
  }, []);
  return (
    <main>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{emailProfile.email}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        name="done-btn"
        onClick={ () => (history.push('/done-recipes')) }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        name="favorite-btn"
        onClick={ () => (history.push('/favorite-recipes')) }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        name="profile-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </main>
  );
}

// Profile.propTypes = { key: PropTypes.type};

export default Profile;

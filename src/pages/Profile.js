import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';// import PropTypes from 'prop-types';

function Profile() {
  // const [emailProfile, setEmailProfile] = useState('');
  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{emailProfile}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        name="done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        name="favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        name="profiel-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

// Profile.propTypes = { key: PropTypes.type};

export default Profile;

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Stack, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%' } }
      >
        <h3 data-testid="profile-email">{emailProfile.email}</h3>
        <Stack spacing={ 3 }>
          <Button
            size="large"
            startIcon={ <DoneIcon /> }
            type="button"
            data-testid="profile-done-btn"
            name="done-btn"
            onClick={ () => (history.push('/done-recipes')) }
          >
            Done Recipes
          </Button>
          <Button
            type="button"
            startIcon={ <FavoriteIcon /> }
            data-testid="profile-favorite-btn"
            name="favorite-btn"
            onClick={ () => (history.push('/favorite-recipes')) }
          >
            Favorite Recipes
          </Button>
          <Button
            type="button"
            startIcon={ <LogoutIcon /> }
            data-testid="profile-logout-btn"
            name="profile-btn"
            onClick={ handleLogout }
          >
            Logout
          </Button>
        </Stack>

      </Box>
      <Footer />
    </main>
  );
}

// Profile.propTypes = { key: PropTypes.type};

export default Profile;

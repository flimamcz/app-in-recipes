import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { TextField, Box, IconButton, Typography } from '@mui/material';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import AppContext from '../context/AppContext';
import logoHeader from '../images/logoHeader.svg';
import drinkLogo from '../images/drinkLogo.svg';
import mealLogo from '../images/mealLogo.svg';

export default function Header({ title, searchImage }) {
  const history = useHistory();
  const { handleChangeSearch, searchInput } = useContext(AppContext);
  const [search, setSearch] = useState(false);
  const searchClick = () => {
    setSearch(!search);
  };
  const profileClick = () => {
    history.push('/profile');
  };

  return (
    <Box
      component="header"
      sx={ {
        display: 'flex',
        flexDirection: 'column',
      } }
    >
      <Box
        sx={ {
          backgroundColor: '#FCDC36',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
        } }
      >
        <img src={ logoHeader } alt="logo Header" />

        <Box>
          {searchImage && (
            <IconButton color="secondary" type="button" onClick={ searchClick }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search Icon"
              />
            </IconButton>
          )}
          <IconButton
            color="secondary"
            type="button"
            onClick={ profileClick }
          >
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profile Icon" />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={ {
          padding: '30px 0',
          textAlign: 'center',
        } }
      >
        <img src={ (title === 'Meals') ? mealLogo : drinkLogo } alt="page logo" />
        <Typography
          variant="h5"
          color="secondary"
          data-testid="page-title"
          sx={ {
            fontWeight: 700,
          } }
        >
          {title}
        </Typography>
      </Box>
      {search && (
        <Box
          fullWidth
          sx={ {
            backgroundColor: '#41197F',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: ' 0 0 10px 0',
            margin: '10px',
            borderRadius: '30px',
          } }
        >
          <TextField
            id="search"
            name="search"
            data-testid="search-input"
            label="Buscar"
            variant="outlined"
            value={ searchInput.search }
            onChange={ handleChangeSearch }
            fullWidth
            sx={ {
              backgroundColor: 'white',
            } }
          />
          <SearchBar />
        </Box>
      )}

    </Box>
  );
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

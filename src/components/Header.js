import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import AppContext from '../context/AppContext';

export default function Header({ title, searchImage }) {
  const history = useHistory();
  const { HandleChangeSearch, searchInput } = useContext(AppContext);
  const [search, setSearch] = useState(false);
  const searchClick = () => {
    setSearch(!search);
  };
  const profileClick = () => {
    history.push('/profile');
  };
  return (
    <div>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile Icon" />
      <h1 data-testid="page-title">{title}</h1>
      {search && (
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
          value={ searchInput.search }
          onChange={ HandleChangeSearch }
        />
      )}

      {searchImage && (
        <button type="button" onClick={ searchClick }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search Icon"
          />
        </button>
      )}
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ profileClick }
      >
        Profile
      </button>
      <SearchBar />
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

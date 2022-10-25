import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, searchImage }) {
  const history = useHistory();
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
      {search && <input type="text" placeholder="Search" />}
      <button type="button" onClick={ searchClick }>
        Search
      </button>
      {searchImage && (
        <img data-testid="search-top-btn" src={ searchIcon } alt="search Icon" />
      )}
      <button data-testid="profile-top-btn" type="button" onClick={ profileClick }>
        Profile
      </button>
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

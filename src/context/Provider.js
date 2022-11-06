import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { getFavoriteRecipes } from '../services/localStorageHelper';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState('true');
  const [recipes, setRecipes] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState({
    search: '',
    filter: '',
  });
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [storageFilter, setStorageFilter] = useState('');
  const [recipeData, setRecipeData] = useState({});
  const [recommendationList, setRecommendationList] = useState([]);

  const handleChangeSearch = ({ target }) => {
    const { name, value } = target;
    setSearchInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheck = ({ target: { id, checked } }) => {
    if (checked) {
      setCheckedIngredients((prevState) => [...prevState, Number(id)]);
    } else if (checked === false) {
      setCheckedIngredients((prevState) => prevState
        .filter((item) => item !== Number(id)));
    }
  };

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, [setFavoriteRecipes]);

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
      recipes,
      setRecipes,
      setCategoriesFilter,
      categoriesFilter,
      searchInput,
      setSearchInput,
      handleChangeSearch,
      checkedIngredients,
      setCheckedIngredients,
      handleCheck,
      setFavoriteRecipes,
      favoriteRecipes,
      storageFilter,
      setStorageFilter,
      recommendationList,
      recipeData,
      setRecipeData,
      setRecommendationList,
    }),
    [
      email,
      password,
      user,
      isDisabled,
      loading,
      recipes,
      categoriesFilter,
      searchInput,
      favoriteRecipes,
      checkedIngredients,
      storageFilter,
      recommendationList,
      recipeData],
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

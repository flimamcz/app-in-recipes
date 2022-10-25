import { buildDoneRecipes, buildFavoriteRecipes } from './objectHelper';

const emptyInprogressRecipes = {
  drinks: {},
  meals: {},
};

export const getInProgressRecipes = () => (JSON
  .parse(localStorage.getItem('inProgressRecipes')) || emptyInprogressRecipes);

export const getDoneRecipes = () => JSON
  .parse(localStorage.getItem('doneRecipes')) || [];

export const getFavoriteRecipes = () => JSON
  .parse(localStorage.getItem('favoriteRecipes')) || [];

export const saveInProgressRecipe = ({ type, id }, usedIngredients) => {
  const savedInProgressRecipes = getInProgressRecipes();
  const handleInfo = {
    ...savedInProgressRecipes,
    [type]: {
      ...savedInProgressRecipes[type],
      [id]: usedIngredients,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(handleInfo));
};

export const saveDoneRecipes = (recipeData) => {
  const savedDoneRecipes = getDoneRecipes();
  const handleInfo = [
    ...savedDoneRecipes,
    buildDoneRecipes(recipeData),
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(handleInfo));
};

export const saveFavoriteRecipes = (recipeData) => {
  const savedFavoriteRecipes = getFavoriteRecipes();
  const handleInfo = [
    ...savedFavoriteRecipes,
    buildFavoriteRecipes(recipeData),
  ];
  localStorage.setItem('favoriteRecipes', JSON.stringify(handleInfo));
};

export const removeFavoriteRecipes = ({ id }) => {
  const savedFavoriteRecipes = getFavoriteRecipes();
  const filterFavorites = savedFavoriteRecipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorites));
};

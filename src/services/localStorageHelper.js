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
  if (type === 'drinks' || type === 'meals') {
    const findUnique = [...new Set(usedIngredients)]
      .map((item) => Number(item))
      .sort((prev, actual) => prev - actual);
    const savedInProgressRecipes = getInProgressRecipes();
    const handleInfo = {
      ...savedInProgressRecipes,
      [type]: {
        [id]: findUnique,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(handleInfo));
  }
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

export const removeInProgressRecipe = ({ type, id }) => {
  if (type === 'drinks' || type === 'meals') {
    const savedInProgressRecipes = getInProgressRecipes();
    const removeDoneRecipe = Object
      .fromEntries(Object
        .entries(savedInProgressRecipes[type])
        .filter((key) => key[0] !== id));
    const handleInfo = {
      ...savedInProgressRecipes,
      [type]: removeDoneRecipe,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(handleInfo));
  }
};

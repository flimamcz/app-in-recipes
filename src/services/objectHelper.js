// Função baseada na do site: https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
const filterKeys = (myObj, valueToFilter) => {
  const fKeys = Object.values(Object.fromEntries(Object
    .entries(myObj).filter(([key]) => key.includes(valueToFilter))));

  const removeEmpty = fKeys.filter((value) => (value !== ''));
  return removeEmpty.filter((value) => (value !== null));
};

export const handleIngredients = (myObj) => {
  const filterIngredients = filterKeys(myObj, 'Ingredient');
  const filterMeasure = filterKeys(myObj, 'Measure');
  const vazio = '';
  let ingredientList = {};
  for (let i = 0; i < filterIngredients.length; i += 1) {
    ingredientList = {
      ...ingredientList,
      [`ingredient${i + 1}`]: `${filterMeasure[i] || vazio} ${filterIngredients[i]}`,
    };
  }
  return Object.fromEntries((Object.entries(ingredientList))
    .filter((ingredient) => ingredient !== vazio));
};

const handleUrl = (url) => {
  const embed = 'https://www.youtube.com/embed/';
  if (url !== undefined) {
    const urlSplit = url.split('.com/watch?v=');
    return `${embed}${urlSplit[1]}`;
  }
  return '';
};

const handleTag = (myObj) => {
  if (myObj.strTags === null || myObj.strTags === undefined) {
    return '';
  }
  return myObj.strTags.split(',');
};

export const handleObject = (myObj, recipeType) => ({
  id: myObj.idDrink || myObj.idMeal,
  type: recipeType,
  nationality: myObj.strArea || '',
  category: myObj.strCategory,
  alcoholicOrNot: myObj.strAlcoholic || '',
  name: myObj.strDrink || myObj.strMeal,
  image: myObj.strDrinkThumb || myObj.strMealThumb,
  ingredients: handleIngredients(myObj),
  instructions: myObj.strInstructions,
  video: handleUrl(myObj.strYoutube) || '',
  tags: handleTag(myObj),
});

export const handleRecommendation = (recommendationList) => {
  const upperIndex = 6;
  const minRecommendationList = recommendationList.map((item) => ({
    id: item.idDrink || item.idMeal,
    name: item.strDrink || item.strMeal,
    image: item.strDrinkThumb || item.strMealThumb,
  }));

  const data = minRecommendationList.filter((item, index) => index < upperIndex);
  return data;
};

export const buildDoneRecipes = ({
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  tags }) => ({

  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  doneDate: new Date().toLocaleDateString(),
  tags,
}
);

export const buildFavoriteRecipes = ({
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image }) => {
  const lastChar = -1;
  return {

    id,
    type: type.slice(0, lastChar),
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
  };
};

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
      [`ingredient${i + 1}`]: `${filterMeasure[i] || vazio}${filterIngredients[i]}`,
    };
  }
  return Object.fromEntries((Object.entries(ingredientList))
    .filter((ingredient) => ingredient !== vazio));
};

const handleUrl = (url) => {
  const embed = 'https://www.youtube.com/embed/';
  const urlSplit = url.split('.com/watch?v=');
  return `${embed}${urlSplit[1]}`;
};

export const handleObject = (myObj) => ({
  photo: myObj.strDrinkThumb || myObj.strMealThumb,
  title: myObj.strDrink || myObj.strMeal,
  category: myObj.strCategory,
  ingredients: handleIngredients(myObj),
  instructions: myObj.strInstructions,
  other: myObj.strAlcoholic || handleUrl(myObj.strYoutube),
});

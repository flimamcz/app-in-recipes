// Meals api https://www.themealdb.com/api.php
// Para categorias type = c, para nacionalidade type = a, para ingredientes type = i

export const fetchMeal = async (type) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealRecommendation = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchIngredientImage = async (ingredientName) => {
  const response = await fetch(`https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png
  `);
  const { meals } = await response.json();
  return meals;
};
export const fetchMealById = async (mealId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const { meals } = await response.json();

  return meals;
};

// drinks API https://www.thecocktaildb.com/api.php

export const fetchDrinkById = async (drinkId) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
  );
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinkRecommendation = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const { drinks } = await response.json();
  return drinks;
};

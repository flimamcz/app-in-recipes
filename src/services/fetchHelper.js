// Meals api https://www.themealdb.com/api.php
// Para categorias type = c, para nacionalidade type = a, para ingredientes type = i

export const fetchMeal = async (type) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`);
  const data = await response.json();
  return data;
};

export const fetchIngredientImage = async (ingredientName) => {
  const response = await fetch(`https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png
  `);
  const data = await response.json();
  return data;
};
export const fetchMealById = async (mealId) => {
  const response = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await response.json();
  return data;
};

// drinks API https://www.thecocktaildb.com/api.php

export const fetchDrinkById = async (drinkId) => {
  const response = await fetch(
    `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
  );
  const data = await response.json();
  return data;
};

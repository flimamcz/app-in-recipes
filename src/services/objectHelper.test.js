import {
  filterKeys,
  handleIngredients,
} from './objectHelper';
import {
  mealApiReturn,
  drinkApiReturn,
  drinkIngredientList,
  mealIngredientList,
} from './mock/mockData';

describe('Testa se a função filterKeys', () => {
  it('Verifica se a função retorna o objeto adequado', () => {
    expect(typeof filterKeys).toBe('function');

    expect(filterKeys(drinkApiReturn, 'Ingredient')).toEqual([
      'Tequila',
      'Triple sec',
      'Lime juice',
      'Salt',
    ]);

    expect(filterKeys(drinkApiReturn, 'Measure')).toEqual([
      '1 1/2 oz ',
      '1/2 oz ',
      '1 oz ',
    ]);

    expect(filterKeys(mealApiReturn, 'Ingredient')).toEqual([
      'soy sauce',
      'water',
      'brown sugar',
      'ground ginger',
      'minced garlic',
      'cornstarch',
      'chicken breasts',
      'stir-fry vegetables',
      'brown rice',
    ]);

    expect(filterKeys(mealApiReturn, 'Measure')).toEqual([
      '3/4 cup',
      '1/2 cup',
      '1/4 cup',
      '1/2 teaspoon',
      '1/2 teaspoon',
      '4 Tablespoons',
      '2',
      '1 (12 oz.)',
      '3 cups',
    ]);
  });
});

describe('Testa se a função handleIngredients', () => {
  it('Verifica se a função retorna o objeto adequado', () => {
    expect(typeof handleIngredients).toBe('function');

    expect(handleIngredients(mealApiReturn)).toEqual(mealIngredientList);
    expect(handleIngredients(drinkApiReturn)).toEqual(drinkIngredientList);
  });
});

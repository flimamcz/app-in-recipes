const resetFilters = (state, functGetc, resetRecipes) => {
  functGetc(!state);
  if (state) {
    resetRecipes();
  }
};

export default resetFilters;

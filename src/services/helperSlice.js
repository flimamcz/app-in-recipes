const helperSlice = (data, slice, router) => {
  let slicedData = [];

  if (router === '/meals') {
    slicedData = data.meals.slice(0, slice);
  } else {
    slicedData = data.drinks.slice(0, slice);
  }

  return slicedData;
};

export default helperSlice;

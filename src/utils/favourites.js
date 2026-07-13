export const addToFavourites = (favourites, id) => {
  if (favourites.includes(id)) return favourites;
  return [...favourites, id];
};

export const removeFromFavourites = (favourites, id) => {
  return favourites.filter((favId) => favId !== id);
};

export const clearAllFavourites = () => {
  return [];
};

// Framework dependencies
import {useEffect, useState} from "react";

// Helpers and constants
import {getLocalStorageItem, setLocalStorageItem} from "../helpers/localStorageHelpers.js";
import {gameInformationFavoritesKey} from "../constants/localStorageKeys.js";

function useGameInformationFavorites() {
  const [favorites, setFavorites] = useState(getLocalStorageItem(gameInformationFavoritesKey) ?? []);

  useEffect(() => {
    setLocalStorageItem(gameInformationFavoritesKey, favorites);
  }, [favorites]);

  const toggleFavorite = (item) => {
    const favoriteKey = getFavoriteKey(item);
    const shouldRemove = isFavorite(item);

    setFavorites(
      shouldRemove
        ? favorites.filter(favorite => getFavoriteKey(favorite) !== favoriteKey)
        : [...favorites, item]
    );
  }

  const getFavoriteKey = (item) => {
    return `${item.type}.${item.index}`;
  }

  const isFavorite = (item) => {
    const favoriteKey = getFavoriteKey(item);
    return favorites.some(favorite => getFavoriteKey(favorite) === favoriteKey);
  }

  const sortedFavorites = [...favorites].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {favorites: sortedFavorites, toggleFavorite, isFavorite};
}

export default useGameInformationFavorites;
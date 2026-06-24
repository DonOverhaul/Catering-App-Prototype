import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'catermatch_favourites';

export function useFavourites() {
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setFavouriteIds(JSON.parse(raw));
        } catch {
          setFavouriteIds([]);
        }
      }
      setLoaded(true);
    });
  }, []);

  // Persist whenever list changes (after initial load)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
  }, [favouriteIds, loaded]);

  const isFavourite = useCallback(
    (id: string) => favouriteIds.includes(id),
    [favouriteIds]
  );

  const toggleFavourite = useCallback((id: string) => {
    setFavouriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  return { favouriteIds, isFavourite, toggleFavourite };
}
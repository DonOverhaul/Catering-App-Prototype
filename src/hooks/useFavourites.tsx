import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'catermatch_favourites';

export function useFavourites() {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) { try { setIds(JSON.parse(raw)); } catch {} }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids, loaded]);

  const isFavourite = useCallback((id: string) => ids.includes(id), [ids]);
  const toggleFavourite = useCallback((id: string) => {
    setIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  return { favouriteIds: ids, isFavourite, toggleFavourite };
}
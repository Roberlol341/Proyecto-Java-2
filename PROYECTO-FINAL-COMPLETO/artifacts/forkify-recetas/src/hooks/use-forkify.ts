import { useCallback, useEffect, useState } from 'react';
import { getRecipe, searchRecipes, type Recipe, type SearchResult } from '@/services/forkify-api';

type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useRecipeSearch() {
  const [state, setState] = useState<AsyncState<SearchResult[]>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const search = useCallback(async (query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    setState({ data: null, isLoading: true, error: null });
    try {
      const data = await searchRecipes(cleanQuery);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'No pudimos completar la búsqueda.',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, search, reset };
}

export function useRecipe(id: string | null) {
  const [state, setState] = useState<AsyncState<Recipe>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const load = useCallback(async (recipeId: string) => {
    setState({ data: null, isLoading: true, error: null });
    try {
      const data = await getRecipe(recipeId);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'No pudimos cargar la receta.',
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      void load(id);
    } else {
      setState({ data: null, isLoading: false, error: null });
    }
  }, [id, load]);

  return { ...state, retry: id ? () => load(id) : () => undefined };
}
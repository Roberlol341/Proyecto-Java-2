export type Ingredient = {
  quantity: number | null;
  unit: string;
  description: string;
};

export type SearchResult = {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
};

export type SearchState = {
  query: string;
  results: SearchResult[];
  page: number;
  resultsPerPage: number;
};

export type Recipe = SearchResult & {
  source_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Ingredient[];
};

type ApiSearchResponse = { data?: { recipes?: SearchResult[] }; message?: string };
type ApiRecipeResponse = { data?: { recipe?: Recipe }; message?: string };

const API_BASE = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const REQUEST_TIMEOUT = 9000;

function normalizeImageUrl(url: string) {
  return url.replace(/^http:\/\//i, 'https://');
}

function buildMexicanQuery(query: string) {
  const cleanQuery = query.trim();
  return cleanQuery.toLowerCase().startsWith('mexican')
    ? cleanQuery
    : `mexican ${cleanQuery}`;
}

async function request<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(url, { signal: controller.signal });
    const body = (await response.json().catch(() => ({}))) as { message?: string };
    if (!response.ok) {
      throw new Error(body.message || `La API respondió con el código ${response.status}.`);
    }
    return body as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('La búsqueda tardó demasiado. Comprueba tu conexión e inténtalo de nuevo.');
    }
    if (error instanceof TypeError) {
      throw new Error('No pudimos conectar con Forkify. Comprueba tu conexión e inténtalo de nuevo.');
    }
    throw error instanceof Error ? error : new Error('Ha ocurrido un error inesperado.');
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function searchRecipes(query: string): Promise<SearchResult[]> {
  const response = await request<ApiSearchResponse>(
    `${API_BASE}?search=${encodeURIComponent(buildMexicanQuery(query))}`,
  );
  return (response.data?.recipes || []).map((recipe) => ({
    ...recipe,
    image_url: normalizeImageUrl(recipe.image_url),
  }));
}

export async function getRecipe(id: string): Promise<Recipe> {
  const response = await request<ApiRecipeResponse>(`${API_BASE}/${encodeURIComponent(id)}`);
  if (!response.data?.recipe) throw new Error(response.message || 'No encontramos esta receta.');
  return {
    ...response.data.recipe,
    image_url: normalizeImageUrl(response.data.recipe.image_url),
  };
}
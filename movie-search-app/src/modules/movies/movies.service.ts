import { searchMovies, getMovieDetails } from "./movies.tmdb.js";
import { mapSearchResponse, mapDetails } from "./movies.mapper.js";
import { getCache, setCache } from "../../integrations/cache/memoryCache.js";

export async function searchMoviesService(input: { query: string; page?: number }) {
  const key = `movies:search:${input.query.toLowerCase()}:page:${input.page || 1}`;
  const cached = getCache<ReturnType<typeof mapSearchResponse>>(key);
  if (cached) return cached;

  const tmdb = await searchMovies(input);
  const data = mapSearchResponse(tmdb);
  setCache(key, data);
  return data;
}

export async function movieDetailsService(id: number) {
  const key = `movies:details:${id}`;
  const cached = getCache<ReturnType<typeof mapDetails>>(key);
  if (cached) return cached;

  const tmdb = await getMovieDetails(id);
  const data = mapDetails(tmdb);
  setCache(key, data);
  return data;
}

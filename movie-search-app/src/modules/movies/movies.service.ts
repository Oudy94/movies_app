import { searchMovies } from "./movies.tmdb.js";
import { mapSearchResponse } from "./movies.mapper.js";

export async function searchMoviesService(input: { query: string; page?: number }) {
  const tmdb = await searchMovies(input);
  return mapSearchResponse(tmdb);
}

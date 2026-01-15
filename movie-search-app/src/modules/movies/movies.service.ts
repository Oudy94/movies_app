import { searchMovies, getMovieDetails } from "./movies.tmdb.js";
import { mapSearchResponse, mapDetails } from "./movies.mapper.js";

export async function searchMoviesService(input: { query: string; page?: number }) {
  const tmdb = await searchMovies(input);
  return mapSearchResponse(tmdb);
}

export async function movieDetailsService(id: number) {
  const tmdb = await getMovieDetails(id);
  return mapDetails(tmdb);
}

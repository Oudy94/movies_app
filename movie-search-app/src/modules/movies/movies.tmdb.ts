import { tmdbGet } from "../../integrations/tmdb/tmdb.http.js";

export async function searchMovies(input: { query: string; page?: number }) {
  return tmdbGet("/search/movie", input);
}

import { tmdbGet } from "../../integrations/tmdb/tmdb.http.js";

export async function searchMovies(input: { query: string; page?: number }) {
  return tmdbGet("/search/movie", input);
}

export async function getMovieDetails(id: number) {
  return tmdbGet(`/movie/${id}`, { append_to_response: "videos" });
}

import { searchMovies, getMovieDetails } from "../integrations/movies.tmdb";
import { mapSearchResponse, mapDetails } from "./movies.mapper";
import { getCache, setCache } from "../../../integrations/cache/memoryCache";
import type { MovieSearchResponseDto, MovieDetailsDto } from "./movies.dto";

export async function searchMoviesService(input: { query: string; page?: number }): Promise<MovieSearchResponseDto> {
  const page = input.page ?? 1;
  const key = `movies:search:${input.query.toLowerCase()}:page:${page}`;

  const cached = getCache<MovieSearchResponseDto>(key);
  if (cached) return cached;

  const tmdb = await searchMovies({ ...input, page });
  const data = mapSearchResponse(tmdb);

  setCache<MovieSearchResponseDto>(key, data);
  return data;
}

export async function movieDetailsService(id: number): Promise<MovieDetailsDto> {
  const key = `movies:details:${id}`;

  const cached = getCache<MovieDetailsDto>(key);
  if (cached) return cached;

  const tmdb = await getMovieDetails(id);
  const data = mapDetails(tmdb);

  setCache<MovieDetailsDto>(key, data);
  return data;
}

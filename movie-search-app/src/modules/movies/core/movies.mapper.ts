import type {
  MovieDetailsDto,
  MovieSearchResponseDto,
  MovieVideoDto,
  MovieListItemDto,
} from "./movies.dto.js";

export function mapSearchResponse(tmdb: any): MovieSearchResponseDto {
  const items: MovieListItemDto[] = Array.isArray(tmdb?.results)
    ? tmdb.results.map((m: any) => ({
        id: Number(m.id),
        title: m.title || m.original_title || "",
        releaseDate: m.release_date || null,
        overview: m.overview || "",
        rating: typeof m.vote_average === "number" ? m.vote_average : null,
        posterPath: m.poster_path || null,
      }))
    : [];

  return {
    page: typeof tmdb?.page === "number" ? tmdb.page : 1,
    totalPages: typeof tmdb?.total_pages === "number" ? tmdb.total_pages : 1,
    totalResults: typeof tmdb?.total_results === "number" ? tmdb.total_results : items.length,
    items,
  };
}

export function mapDetails(tmdb: any): MovieDetailsDto {
  const videos: MovieVideoDto[] = Array.isArray(tmdb?.videos?.results)
    ? tmdb.videos.results.map((v: any) => ({
        name: v.name || "",
        site: v.site || "",
        key: v.key || "",
        type: v.type || "",
      }))
    : [];

  return {
    id: Number(tmdb?.id),
    title: tmdb?.title || tmdb?.original_title || "",
    releaseDate: tmdb?.release_date || null,
    overview: tmdb?.overview || "",
    runtimeMinutes: typeof tmdb?.runtime === "number" ? tmdb.runtime : null,
    genres: Array.isArray(tmdb?.genres) ? tmdb.genres.map((g: any) => g.name).filter(Boolean) : [],
    rating: typeof tmdb?.vote_average === "number" ? tmdb.vote_average : null,
    homepage: tmdb?.homepage || null,
    posterPath: tmdb?.poster_path || null,
    videos,
  };
}

export function mapSearchResponse(tmdb: any) {
  const items = Array.isArray(tmdb?.results)
    ? tmdb.results.map((m: any) => ({
        id: m.id,
        title: m.title || m.original_title || "",
        releaseDate: m.release_date || null,
        overview: m.overview || "",
        rating: typeof m.vote_average === "number" ? m.vote_average : null,
        posterPath: m.poster_path || null
      }))
    : [];

  return {
    page: tmdb?.page ?? 1,
    totalPages: tmdb?.total_pages ?? 1,
    totalResults: tmdb?.total_results ?? items.length,
    items
  };
}

export function mapDetails(tmdb: any) {
  return {
    id: tmdb?.id,
    title: tmdb?.title || tmdb?.original_title || "",
    releaseDate: tmdb?.release_date || null,
    overview: tmdb?.overview || "",
    runtimeMinutes: tmdb?.runtime ?? null,
    genres: Array.isArray(tmdb?.genres) ? tmdb.genres.map((g: any) => g.name) : [],
    rating: typeof tmdb?.vote_average === "number" ? tmdb.vote_average : null,
    homepage: tmdb?.homepage || null,
    videos: Array.isArray(tmdb?.videos?.results)
      ? tmdb.videos.results.map((v: any) => ({ name: v.name, site: v.site, key: v.key, type: v.type }))
      : []
  };
}

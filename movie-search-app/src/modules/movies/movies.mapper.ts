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

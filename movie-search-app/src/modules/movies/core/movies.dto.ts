export interface MovieListItemDto {
  id: number;
  title: string;
  releaseDate: string | null;
  overview: string;
  rating: number | null;
  posterPath: string | null;
}

export interface MovieSearchResponseDto {
  page: number;
  totalPages: number;
  totalResults: number;
  items: MovieListItemDto[];
}

export interface MovieVideoDto {
  name: string;
  site: string;
  key: string;
  type: string;
}

export interface MovieDetailsDto {
  id: number;
  title: string;
  releaseDate: string | null;
  overview: string;
  runtimeMinutes: number | null;
  genres: string[];
  rating: number | null;
  homepage: string | null;
  posterPath: string | null;
  videos: MovieVideoDto[];
}

function must(name: string): string {
  const v = process.env[name];
  if (!v || !String(v).trim()) throw new Error(`Missing env var: ${name}`);
  return String(v).trim();
}

function opt(name: string, fallback: string): string {
  const v = process.env[name];
  return v && String(v).trim() ? String(v).trim() : fallback;
}

export const env = {
  PORT: Number(opt("PORT", "3000")),
  TMDB_BASE_URL: opt("TMDB_BASE_URL", "https://api.themoviedb.org/3"),
  TMDB_ACCESS_TOKEN: must("TMDB_ACCESS_TOKEN"),
  TMDB_LANGUAGE: opt("TMDB_LANGUAGE", "en-US")
};

function requireEnvString(name: string): string {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return String(v).trim();
}

function requireEnvInt(name: string): number {
  const raw = requireEnvString(name);
  const n = Number(raw);

  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    throw new Error(`Environment variable ${name} must be an integer. Got: "${raw}"`);
  }

  return n;
}

export const env = {
  PORT: requireEnvInt("PORT"),
  TMDB_BASE_URL: requireEnvString("TMDB_BASE_URL"),
  TMDB_ACCESS_TOKEN: requireEnvString("TMDB_ACCESS_TOKEN"),
  TMDB_LANGUAGE: requireEnvString("TMDB_LANGUAGE"),
  CACHE_TTL_SECONDS: requireEnvInt("CACHE_TTL_SECONDS"),
  CACHE_MAX_ITEMS: requireEnvInt("CACHE_MAX_ITEMS")
};

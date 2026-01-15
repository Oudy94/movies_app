import { env } from "../../config/env.js";
import { ApiError } from "../../api/utils/ApiError.js";
import { logger } from "../../shared/logger.js";

function buildUrl(path: string, params: Record<string, unknown> = {}) {
  const url = new URL(env.TMDB_BASE_URL + path);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    url.searchParams.set(k, String(v));
  }
  return url.toString();
}

export async function tmdbGet(path: string, params: Record<string, unknown> = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const url = buildUrl(path, { language: env.TMDB_LANGUAGE, ...params });
    logger.debug({ path, params }, "TMDB request");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`
      },
      signal: controller.signal
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      logger.warn({ status: res.status, path }, "TMDB request failed");
      throw ApiError.upstream("TMDB request failed");
    }

    return json;
  } catch (e: any) {
    if (e?.name === "AbortError") throw ApiError.upstream("TMDB timeout");
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

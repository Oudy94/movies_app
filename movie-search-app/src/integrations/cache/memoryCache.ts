import { LRUCache } from "lru-cache";
import { env } from "../../config/env.js";

const cache = new LRUCache<string, any>({
  max: env.CACHE_MAX_ITEMS,
  ttl: env.CACHE_TTL_SECONDS * 1000
});

export function getCache<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}

export function setCache<T>(key: string, value: T) {
  cache.set(key, value);
}

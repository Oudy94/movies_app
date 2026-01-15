# Movie Search — Node.js (Express) + TypeScript

A small movie search app powered by TMDB. It’s intentionally simple on the UI side, and solid on the back-end side: clean layering, stable response shapes (DTOs), caching, security basics, and logging.

---

## Features
- Search movies by title
- Results shown as simple cards (poster + title + year + rating)
- Click a movie to open a **movie details page** (poster, title, release date, rating, genres, runtime, overview, trailers)

---

## Tech stack
- Node.js + Express
- TypeScript (ESM / NodeNext-style imports)
- TMDB API (Read Access Token)
- `lru-cache` for in-memory caching (TTL + max items)
- `pino` + `pino-http` for logging
- `helmet` + rate limiting for basic security

---

## Structure (High level)
The code is split into layers so each part has one job:

- **Routes / Controller**: HTTP endpoints, reads query/params, returns JSON
- **Service**: business logic (when to call TMDB, when to use cache, what to return)
- **TMDB Adapter**: all TMDB calls in one place (HTTP + endpoints)
- **Mapper + DTOs**: converts TMDB data into a stable, front-end friendly shape

---

## API Endpoints

### `GET /api/movies/search?query=<text>&page=<n>`
Returns a shaped DTO response (no raw TMDB response).

Example response:
```json
{
  "page": 1,
  "totalPages": 50,
  "totalResults": 1000,
  "items": [
    {
      "id": 123,
      "title": "Batman",
      "releaseDate": "1989-06-23",
      "overview": "...",
      "rating": 7.2,
      "posterPath": "/abc.jpg"
    }
  ]
}
```

---

## Screenshots
Search:
<img width="1435" height="1210" alt="search" src="https://github.com/user-attachments/assets/27bdb349-dd2d-4679-8793-b619b41c3452" />

Details:
<img width="1060" height="662" alt="details" src="https://github.com/user-attachments/assets/a5b05e8a-9e77-4cd7-b6f9-b55ac344f129" />




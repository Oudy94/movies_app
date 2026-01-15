const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

const form = document.getElementById("searchForm");
const q = document.getElementById("q");
const btn = document.getElementById("btn");
const results = document.getElementById("results");
const statusEl = document.getElementById("status");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentQuery = "";
let currentPage = 1;
let totalPages = 1;

function setLoading(isLoading) {
  btn.disabled = isLoading;
  prevBtn.disabled = isLoading || currentPage <= 1;
  nextBtn.disabled = isLoading || currentPage >= totalPages;
  statusEl.textContent = isLoading ? "Loading…" : "";
}

function posterUrl(path) {
  if (!path) return "";
  return `${TMDB_IMG}${path}`;
}

function render(items) {
  results.innerHTML = "";
  if (!items.length) {
    results.innerHTML = `<div class="muted">No results.</div>`;
    return;
  }

  for (const m of items) {
    const card = document.createElement("div");
    card.className = "cardMovie";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.className = "poster";
    img.alt = m.title || "Poster";
    const p = posterUrl(m.posterPath);
    img.src = p || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' dominant-baseline='middle' text-anchor='middle' font-family='Arial'%3ENo Poster%3C/text%3E%3C/svg%3E";

    const body = document.createElement("div");
    body.className = "cardBody";

    const title = document.createElement("div");
    title.className = "cardTitle";
    title.textContent = m.title;

    const meta = document.createElement("div");
    meta.className = "cardMeta";

    const year = (m.releaseDate || "").slice(0, 4) || "n/a";
    const left = document.createElement("div");
    left.textContent = year;

    const right = document.createElement("div");
    right.className = "badge";
    right.textContent = (typeof m.rating === "number" ? m.rating.toFixed(1) : "—");

    meta.appendChild(left);
    meta.appendChild(right);

    body.appendChild(title);
    body.appendChild(meta);

    card.appendChild(img);
    card.appendChild(body);

    const go = () => (window.location.href = `/movie.html?id=${encodeURIComponent(m.id)}`);
    card.addEventListener("click", go);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });

    results.appendChild(card);
  }
}

async function doSearch(query, page) {
  currentQuery = query;
  currentPage = page;

  setLoading(true);
  try {
    const r = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`);
    const data = await r.json();

    if (!r.ok) {
      results.innerHTML = `<div class="muted" style="color:#ff5c7a">${data.error?.message || "Error"}</div>`;
      return;
    }

    totalPages = data.totalPages || 1;
    pageInfo.textContent = `Page ${data.page} / ${totalPages}`;

    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    render(data.items || []);
  } catch (e) {
    results.innerHTML = `<div class="muted" style="color:#ff5c7a">Request failed</div>`;
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = q.value.trim();
  if (!query) return;
  doSearch(query, 1);
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) doSearch(currentQuery, currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) doSearch(currentQuery, currentPage + 1);
});

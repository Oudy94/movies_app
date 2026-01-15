const TMDB_IMG = "https://image.tmdb.org/t/p/w780";

const statusEl = document.getElementById("movieStatus");
const wrap = document.getElementById("detailsWrap");

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const titleTop = document.getElementById("movieTitleTop");
const chips = document.getElementById("chips");

const releaseDate = document.getElementById("releaseDate");
const runtime = document.getElementById("runtime");
const rating = document.getElementById("rating");
const homepage = document.getElementById("homepage");
const overview = document.getElementById("overview");

const trailersCard = document.getElementById("trailersCard");
const trailers = document.getElementById("trailers");

function getId() {
  const u = new URL(window.location.href);
  return u.searchParams.get("id");
}

function setLoading(msg) {
  statusEl.textContent = msg || "";
}

function setPoster(path, alt) {
  if (!path) {
    poster.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='900'%3E%3Crect width='100%25' height='100%25' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' dominant-baseline='middle' text-anchor='middle' font-family='Arial'%3ENo Poster%3C/text%3E%3C/svg%3E";
    poster.alt = "No poster";
    return;
  }
  poster.src = `${TMDB_IMG}${path}`;
  poster.alt = alt || "Poster";
}

function setGenres(genres) {
  chips.innerHTML = "";
  (genres || []).forEach((g) => {
    const el = document.createElement("div");
    el.className = "chip";
    el.textContent = g;
    chips.appendChild(el);
  });
}

function setTrailers(videos) {
  const list = (videos || []).filter(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
  if (!list.length) {
    trailersCard.hidden = true;
    return;
  }
  trailersCard.hidden = false;
  trailers.innerHTML = "";

  list.slice(0, 6).forEach((v) => {
    const a = document.createElement("a");
    a.className = "link";
    a.href = `https://www.youtube.com/watch?v=${encodeURIComponent(v.key)}`;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `<span>${escapeHtml(v.name || "Trailer")}</span><span class="muted">${v.type}</span>`;
    trailers.appendChild(a);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}

async function load() {
  const id = getId();
  if (!id) {
    setLoading("Missing movie id.");
    return;
  }

  setLoading("Loading…");
  wrap.hidden = true;

  try {
    const r = await fetch(`/api/movies/${encodeURIComponent(id)}`);
    const data = await r.json();

    if (!r.ok) {
      setLoading(data.error?.message || "Error");
      return;
    }

    setLoading("");
    wrap.hidden = false;

    title.textContent = data.title || "—";
    titleTop.textContent = data.title || "Movie";
    setPoster(data.posterPath, data.title);
    setGenres(data.genres || []);

    releaseDate.textContent = data.releaseDate || "—";
    runtime.textContent = data.runtimeMinutes ? `${data.runtimeMinutes} min` : "—";
    rating.textContent = typeof data.rating === "number" ? data.rating.toFixed(1) : "—";

    if (data.homepage) {
      homepage.textContent = "Open";
      homepage.href = data.homepage;
    } else {
      homepage.textContent = "—";
      homepage.removeAttribute("href");
    }

    overview.textContent = data.overview || "—";
    setTrailers(data.videos || []);
  } catch (e) {
    setLoading("Request failed.");
  }
}

load();

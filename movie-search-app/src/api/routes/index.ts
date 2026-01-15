import express from "express";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ name: "tmdb-movie-search", version: "1.0.0" });
});

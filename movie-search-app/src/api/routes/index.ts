import express from "express";
import { moviesRouter } from "../../modules/movies/api/movies.routes";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ name: "tmdb-movie-search", version: "1.0.0" });
});

apiRouter.use("/movies", moviesRouter);

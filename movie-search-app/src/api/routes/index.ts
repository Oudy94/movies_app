import express from "express";
import { moviesRouter } from "../../modules/movies/movies.routes.js";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ name: "tmdb-movie-search", version: "1.0.0" });
});

apiRouter.use("/movies", moviesRouter);

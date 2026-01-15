import express from "express";
import { search } from "./movies.controller.js";
import { validateQuery } from "../../api/middlewares/validate.js";
import { searchQuerySchema } from "./movies.schemas.js";

export const moviesRouter = express.Router();

moviesRouter.get("/search", validateQuery(searchQuerySchema), search);

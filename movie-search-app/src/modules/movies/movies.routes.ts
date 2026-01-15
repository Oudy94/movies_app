import express from "express";
import { search, details } from "./movies.controller.js";
import { validateQuery, validateParams } from "../../api/middlewares/validate.js";
import { searchQuerySchema, idParamsSchema } from "./movies.schemas.js";

export const moviesRouter = express.Router();

moviesRouter.get("/search", validateQuery(searchQuerySchema), search);
moviesRouter.get("/:id", validateParams(idParamsSchema), details);

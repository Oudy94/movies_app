import express from "express";
import { search, details } from "./movies.controller";
import { validateQuery, validateParams } from "../../../api/middlewares/validate";
import { searchQuerySchema, idParamsSchema } from "./movies.schemas";

export const moviesRouter = express.Router();

moviesRouter.get("/search", validateQuery(searchQuerySchema), search);
moviesRouter.get("/:id", validateParams(idParamsSchema), details);

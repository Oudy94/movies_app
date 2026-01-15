import type { NextFunction, Request, Response } from "express";
import { searchMoviesService } from "./movies.service.js";

export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const q = req.validatedQuery as { query: string; page?: number };
    const data = await searchMoviesService(q);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

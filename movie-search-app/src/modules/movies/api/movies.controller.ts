import type { NextFunction, Request, Response } from "express";
import { searchMoviesService, movieDetailsService } from "../core/movies.service";

export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const q = req.validatedQuery as { query: string; page?: number };
    const data = await searchMoviesService(q);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function details(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.validatedParams as { id: number };
    const data = await movieDetailsService(id);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

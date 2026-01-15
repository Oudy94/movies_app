import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const e = err instanceof ApiError ? err : new ApiError(500, "INTERNAL_ERROR", "Unexpected error");
  if (!(err instanceof ApiError)) console.error(err);

  res.status(e.status).json({ error: { code: e.code, message: e.message } });
}

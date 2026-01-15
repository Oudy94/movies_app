import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import type { ZodSchema } from "zod";

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      const msg = parsed.error.issues.map(i => i.message).join(", ");
      return next(ApiError.badRequest(msg));
    }
    req.validatedQuery = parsed.data;
    next();
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      const msg = parsed.error.issues.map(i => i.message).join(", ");
      return next(ApiError.badRequest(msg));
    }
    req.validatedParams = parsed.data;
    next();
  };
}

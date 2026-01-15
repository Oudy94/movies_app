import { z } from "zod";

export const searchQuerySchema = z.object({
  query: z.string().trim().min(1, "query is required"),
  page: z.coerce.number().int().min(1).max(500).optional()
});

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive number")
});
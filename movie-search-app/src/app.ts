import express from "express";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { apiRouter } from "./api/routes/index";
import { notFound } from "./api/middlewares/notFound";
import { errorHandler } from "./api/middlewares/errorHandler";
import { httpLogger } from "./api/middlewares/httpLogger";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");

  app.use(httpLogger);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "img-src": ["'self'", "data:", "https://image.tmdb.org"],
        },
      },
    })
  );

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

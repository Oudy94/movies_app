import { pinoHttp } from "pino-http";
import { logger } from "../../shared/logger.js";

export const httpLogger = pinoHttp({
  logger,

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode
      };
    }
  },

  customLogLevel(req, res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} -> ${res.statusCode}`;
  },
  customErrorMessage(req, res, err) {
    return `${req.method} ${req.url} -> ${res.statusCode} (${err?.message || "error"})`;
  },

  autoLogging: {
    ignore: (req) => req.url === "/health"
  }
});

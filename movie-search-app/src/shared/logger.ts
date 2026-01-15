import pino from "pino";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const level = process.env.LOG_LEVEL?.trim() || "info";
const pretty = (process.env.LOG_PRETTY || "").toLowerCase() === "true";

let prettyTarget: string | undefined;
if (pretty) {
  try {
    prettyTarget = require.resolve("pino-pretty");
  } catch {
    prettyTarget = undefined;
  }
}

export const logger = pino({
  level,
  transport:
    pretty && prettyTarget
      ? {
          target: prettyTarget,
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname"
          }
        }
      : undefined
});

import winston from "winston";
import Env from "./env";

const defaultLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.ms(),
  winston.format.prettyPrint(),
  winston.format.printf((info) => {
    const yellow = (str: string) => `\x1b[33m${str}\x1b[0m`;
    const green = (str: string) => `\x1b[32m${str}\x1b[0m`;
    const args = info[Symbol.for("splat")]
      ? JSON.stringify(info[Symbol.for("splat")])
      : "";
    return `${yellow(String(info.timestamp))} [${info.level}]: ${green(
      String(info.message)
    )} ${yellow(String(info.ms))} ${args}`;
  })
);

const logFormat = defaultLogFormat;

const Logger = winston.createLogger({
  format: logFormat,
  transports: [new winston.transports.Console()],
  level: Env.get('LOG_LEVEL') as string
});

export default Logger;

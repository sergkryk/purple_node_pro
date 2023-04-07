import { injectable } from "inversify";
import { ILogObj, Logger } from "tslog";
import ILogger from "./logger.interface.js";

@injectable()
export default class LoggerService implements ILogger {
  private readonly _logger: Logger<ILogObj>

  constructor() {
    this._logger = new Logger({
      type: "pretty",
    });
  }

  log(...args:unknown[]) {
    this._logger.info(...args)
  }
  error(...args:unknown[]) {
    this._logger.error(...args)
  }
  warn(...args:unknown[]) {
    this._logger.warn(...args)
  }
}
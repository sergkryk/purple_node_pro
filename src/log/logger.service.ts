import { ILogObj, Logger } from "tslog";

export default class LoggerService {
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
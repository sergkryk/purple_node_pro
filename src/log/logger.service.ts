import { injectable } from 'inversify';
import { ILogObj, Logger } from 'tslog';
import ILogger from './logger.interface';

@injectable()
export default class LoggerService implements ILogger {
	private readonly _logger: Logger<ILogObj>;

	constructor() {
		this._logger = new Logger({
			type: 'pretty',
		});
	}

	log(...args: unknown[]): void {
		this._logger.info(...args);
	}
	error(...args: unknown[]): void {
		this._logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this._logger.warn(...args);
	}
}

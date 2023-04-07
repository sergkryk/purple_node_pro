import { Response, Request, NextFunction } from 'express';
import LoggerService from '../log/logger.service';
import IExeptionFilter from './exeption.filter.interface';
import HTTPError from './http-error';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';

@injectable()
export default class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: LoggerService) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка: ${err.statusCode}! ${err.message}.`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}.`);
			res.status(500).send({ err: err.message });
		}
	}
}

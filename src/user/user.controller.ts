import { Request, Response, NextFunction } from 'express';
import RoutesController from '../common/controllers/routes.controller.js';
import HTTPError from '../errors/http-error.js';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types.js';
import ILogger from '../log/logger.interface.js';
import IUserController from './user.controller.interface.js';

@injectable()
export default class UserController extends RoutesController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'get',
				func: this.login,
			},
			{
				path: '/register',
				method: 'get',
				func: this.register,
			},
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.send(res, 'Login', 200);
	}

	register(req: Request, res: Response, next: NextFunction): void {
		// return this.send(res, 'Register', 200)
		next(new HTTPError('Тестовая ошибка', 404));
	}
}

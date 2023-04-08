import { Request, Response, NextFunction } from 'express';
import RoutesController from '../common/controllers/routes.controller';
import HTTPError from '../errors/http-error';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import ILogger from '../log/logger.interface';
import IUserController from './user.controller.interface';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';

@injectable()
export default class UserController extends RoutesController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'get',
				func: this.register,
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.send(res, 'Login', 200);
	}

	register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
		// return this.send(res, 'Register', 200)
		next(new HTTPError('Тестовая ошибка', 404));
	}
}

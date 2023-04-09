import { Request, Response, NextFunction } from 'express';
import RoutesController from '../common/controllers/routes.controller';
import HTTPError from '../errors/http-error';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import ILogger from '../log/logger.interface';
import IUserController from './user.controller.interface';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './user.entity';

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
				method: 'post',
				func: this.register,
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, { status: 'success' });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const user = new User(body.email, body.name);
		await user.setPassword(body.password);
		this.ok(res, { name: user.name, email: user.email, password: user.password });
	}
}

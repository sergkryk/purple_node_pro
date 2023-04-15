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
import { IUserService } from './user.service.interface';

@injectable()
export default class UserController extends RoutesController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {
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

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		this.ok(res, { status: `${result}` });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (result?.name) {
			this.ok(res, {
				name: result.name,
				email: result.email,
				password: result.password,
				id: result.id,
			});
		}
		this.ok(res, {
			error: 'User exists',
		});
	}
}

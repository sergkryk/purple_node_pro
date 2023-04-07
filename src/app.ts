import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import UserController from './user/user.controller.js';
import { injectable, inject } from 'inversify';
import ILogger from './log/logger.interface.js';
import { TYPES } from './types.js';
import IExeptionFilter from './errors/exeption.filter.interface.js';

const PORT = 3000;
const networkInterface = '127.0.0.1';

@injectable()
export default class App {
	app: Express;
	server: Server;
	port: number;
	networkInterface: string;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
	) {
		this.app = express();
		this.port = PORT;
		this.networkInterface = networkInterface;
	}

	private useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	private useExeptions(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExeptions();
		this.server = await this.app.listen(this.port, this.networkInterface);
		this.logger.log(`Сервер запущен на интерфейсе ${this.networkInterface} порт № ${this.port}`);
	}
}

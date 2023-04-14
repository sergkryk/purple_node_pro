import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import UserController from './user/user.controller';
import { injectable, inject } from 'inversify';
import ILogger from './log/logger.interface';
import { TYPES } from './types';
import IExeptionFilter from './errors/exeption.filter.interface';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import DbService from './database/db.service';

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
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.DbService) private dbService: DbService,
	) {
		this.app = express();
		this.port = PORT;
		this.networkInterface = networkInterface;
	}

	private useMiddleware(): void {
		this.app.use(json());
	}

	private useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	private useExeptions(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptions();
		await this.dbService.connect();
		this.server = await this.app.listen(this.port, this.networkInterface);
		this.logger.log(`Сервер запущен на интерфейсе ${this.networkInterface} порт № ${this.port}`);
	}
}

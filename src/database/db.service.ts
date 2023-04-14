import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import ILogger from '../log/logger.interface';

@injectable()
export default class DbService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		this.logger.log('Успешно подключено к базе данных');
		await this.client.$connect();
	}
	async disconnect(): Promise<void> {
		this.logger.log('Не удалось подключиться к базе данных');
		await this.client.$disconnect();
	}
}

import { UserModel } from '@prisma/client';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import DbService from '../database/db.service';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.DbService) private dbService: DbService) {}
	async create({ email, password, name }: User): Promise<UserModel> {
		return this.dbService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.dbService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}

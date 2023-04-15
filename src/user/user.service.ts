import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const user = await new User(email, name);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, Number(salt));
		const exist = await this.userRepository.find(email);
		if (exist) {
			return null;
		}
		return this.userRepository.create(user);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const remoteUser = await this.userRepository.find(email);
		if (remoteUser?.password) {
			return User.comparePasswords(password, remoteUser.password);
		}
		return false;
	}
}

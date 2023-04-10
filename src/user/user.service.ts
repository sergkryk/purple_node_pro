import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const user = await new User(email, name);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, Number(salt));
		return user;
	}

	validateUser(dto: UserLoginDto): boolean {
		return true;
	}
}

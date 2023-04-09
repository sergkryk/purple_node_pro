import { injectable } from 'inversify';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const user = await new User(email, name);
		await user.setPassword(password);
		return user;
	}

	validateUser(dto: UserLoginDto): boolean {
		return true;
	}
}

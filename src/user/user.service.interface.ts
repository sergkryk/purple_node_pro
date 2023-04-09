import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<User | null>;
	validateUser(dto: UserLoginDto): boolean;
}

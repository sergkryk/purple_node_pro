import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<UserModel | null>;
	validateUser(dto: UserLoginDto): Promise<boolean>;
}

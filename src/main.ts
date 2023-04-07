import { Container, ContainerModule, interfaces } from 'inversify';
import App from './app';
import ExeptionFilter from './errors/exeption.filter';
import LoggerService from './log/logger.service';
import UserController from './user/user.controller';
import { TYPES } from './types';
import IExeptionFilter from './errors/exeption.filter.interface';
import ILogger from './log/logger.interface';
import IUserController from './user/user.controller.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();

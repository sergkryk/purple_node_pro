import { Container } from "inversify";
import App from "./app.js";
import ExeptionFilter from "./errors/exeption.filter.js";
import LoggerService from "./log/logger.service.js";
import UserController from "./user/user.controller.js";
import IExeptionFilter from "./errors/exeption.filter.interface.js";
import { TYPES } from "./types.js";
import ILogger from "./log/logger.interface.js";



const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

app.init();

export { app, appContainer };
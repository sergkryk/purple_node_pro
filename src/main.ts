import App from "./app.js";
import ExeptionFilter from "./errors/exeption.filter.js";
import LoggerService from "./log/logger.service.js";
import UserController from "./user/user.controller.js";

const PORT: number = 3000;
const networkInterface: string = "127.0.0.1";

const logger = new LoggerService();

async function bootstrap() {
  const app = new App(
    PORT,
    networkInterface,
    logger,
    new UserController(logger),
    new ExeptionFilter(logger)
  );
  await app.init();
}

bootstrap();

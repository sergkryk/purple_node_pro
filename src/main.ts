import App from './app.js';
import LoggerService from "./log/logger.service.js";

const PORT:number = 3000;
const networkInterface:string = '127.0.0.1'

async function bootstrap() {
  const app = new App(PORT, networkInterface, new LoggerService());
  app.init();
}

bootstrap()
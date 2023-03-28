import App from './app';

const PORT:number = 3000;
const networkInterface:string = '127.0.0.1'

async function bootstrap() {
  const app = new App(PORT, networkInterface);
  app.init();
}

bootstrap()
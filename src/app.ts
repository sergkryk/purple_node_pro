import express, { Express, Request, Response, NextFunction } from "express";
import { Server } from 'http';

import userRouter from './routes/users';


export default class App {
  app: Express;
  server: Server;
  port: number;
  networkInterface: string;

  constructor(port:number, networkInterface: string) {
    this.app = express();
    this.port = port;
    this.networkInterface = networkInterface;
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port, this.networkInterface);
    console.log(`Сервер запущен на интерфейсе ${this.networkInterface} порт № ${this.port}`);
  }

  useRoutes() {
    this.app.use('/users', userRouter);
  }
}

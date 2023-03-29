import express, { Express, Request, Response, NextFunction } from "express";
import { Server } from 'http';
import LoggerService from "./log/logger.service.js";

import userRouter from './routes/users.js';


export default class App {
  app: Express;
  server: Server;
  port: number;
  networkInterface: string;
  logger: LoggerService;

  constructor(port:number, networkInterface: string, logger: LoggerService) {
    this.app = express();
    this.port = port;
    this.networkInterface = networkInterface;
    this.logger = logger;
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port, this.networkInterface);
    this.logger.log(`Сервер запущен на интерфейсе ${this.networkInterface} порт № ${this.port}`)
  }

  useRoutes() {
    this.app.use('/users', userRouter);
  }
}

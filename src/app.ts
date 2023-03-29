import express, { Express, Request, Response, NextFunction } from "express";
import { Server } from "http";
import LoggerService from "./log/logger.service.js";
import UserController from "./user/user.controller.js";

export default class App {
  app: Express;
  server: Server;
  port: number;
  networkInterface: string;
  logger: LoggerService;
  userController: UserController;

  constructor(
    port: number,
    networkInterface: string,
    logger: LoggerService,
    userController: UserController
  ) {
    this.app = express();
    this.port = port;
    this.networkInterface = networkInterface;
    this.logger = logger;
    this.userController = userController;
  }

  private useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = await this.app.listen(this.port, this.networkInterface);
    this.logger.log(
      `Сервер запущен на интерфейсе ${this.networkInterface} порт № ${this.port}`
    );
  }
}

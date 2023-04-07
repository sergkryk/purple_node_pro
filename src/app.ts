import express, { Express, Request, Response, NextFunction } from "express";
import { Server } from "http";
import ExeptionFilter from "./errors/exeption.filter.js";
import LoggerService from "./log/logger.service.js";
import UserController from "./user/user.controller.js";

export default class App {
  app: Express;
  server: Server;
  port: number;
  networkInterface: string;
  logger: LoggerService;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(
    port: number,
    networkInterface: string,
    logger: LoggerService,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = port;
    this.networkInterface = networkInterface;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  private useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  private useExeptions() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptions();
    this.server = await this.app.listen(this.port, this.networkInterface);
    this.logger.log(
      `Сервер запущен на интерфейсе ${this.networkInterface} порт № ${this.port}`
    );
  }
}

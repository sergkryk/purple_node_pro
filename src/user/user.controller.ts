import { Request, Response, NextFunction } from "express";
import RoutesController from "../common/controllers/routes.controller.js";
import LoggerService from "../log/logger.service.js";

export default class UserController extends RoutesController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: '/login',
        method: 'get',
        func: this.login,
      },
      {
        path: '/register',
        method: 'get',
        func: this.register,
      }
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    return this.send(res, 'Login', 200)
  }

  register(req: Request, res: Response, next: NextFunction) {
    return this.send(res, 'Register', 200)
  }
}


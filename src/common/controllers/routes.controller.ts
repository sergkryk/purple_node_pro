import { Response, Router } from "express";
import IRoute from "../interfaces/route.interface.js";
import ILogger from "../../log/logger.interface.js";
import { injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export default abstract class RoutesController {
  private readonly _router: Router;
  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send(res: Response, message: string, code: number) {
    res.type("application/json");
    return res.status(code).json({ message: message });
  }

  protected bindRoutes(routes: IRoute[]) {
    for (let route of routes) {
      this.logger.log(`${route.method} is binded to ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}

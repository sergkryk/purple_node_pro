import { Response, Router } from "express";
import LoggerService from "../../log/logger.service.js";
import IRoute from "../interfaces/route.interface.js";

export default abstract class RoutesController {
  private readonly _router: Router;
  constructor(private logger: LoggerService) {
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

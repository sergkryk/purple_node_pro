import { Response, Router } from 'express';
import IRoute from '../interfaces/route.interface';
import ILogger from '../../log/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default abstract class RoutesController {
	private readonly _router: Router;
	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	private send<T>(res: Response, message: T, code: number): Response<any, Record<string, any>> {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response<any, Record<string, any>> {
		return this.send(res, message, 200);
	}

	protected bindRoutes(routes: IRoute[]): void {
		for (const route of routes) {
			this.logger.log(`${route.method} is binded to ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this._router[route.method](route.path, pipeline);
		}
	}
}

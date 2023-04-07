import { Request, Response, NextFunction, Router } from 'express';

export default interface IRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
}

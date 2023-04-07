import { Response, Request, NextFunction } from 'express';

export default interface IExeptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

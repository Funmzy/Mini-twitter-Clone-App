import { Request, Response, NextFunction } from 'express';

export default (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => {
      console.log('hello');
      next(err);
    });
  };
};
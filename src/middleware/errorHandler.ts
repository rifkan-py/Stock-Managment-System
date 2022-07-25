import { NextFunction, Request, Response } from 'express';

class CustomError {
  message!: string;
  status!: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalInfo!: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, status = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

function errorHandler(
  err: TypeError | CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError('Internal Server Error');
  }
  res.status((customError as CustomError).status).send(customError);
  next();
}

export default errorHandler;

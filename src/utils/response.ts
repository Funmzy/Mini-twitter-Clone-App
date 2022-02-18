import { ResponseData } from '../utils/interfaces';
import { Response } from 'express';

class Responses {
  statusCode: number | null;

  status: string | null;

  data: ResponseData | null;

  message: string | null;

  constructor() {
    this.data = null;
    this.message = null;
    this.statusCode = null;
    this.status = null;
  }

  setSuccess(statusCode: number, message: string, data: ResponseData) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = 'successful';
  }

  send(res: Response) {
    const result = {
      status: this.status,
      message: this.message,
      data: this.data,
    };

    return res.status(this.statusCode ? this.statusCode : 200).json(result);
  }
}

export default Responses;
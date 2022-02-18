import ErrorHandler from './../utils/appError';

const handleCastErrorDB = (err: { path: any; value: any }) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ErrorHandler(400, message);
};
const handleDuplicateFieldsDB = (err: any) => {
  console.log(err);

  const dupValue = Object.values(err.keyValue);
  const message = `Duplicate field value: ${dupValue}. Please use another value!`;

  console.log(message);

  return new ErrorHandler(400, message);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ErrorHandler(400, message);
};

const handleJWTError = () => new ErrorHandler(401, 'Invalid token. Please log in again!');
const handleJWTExpiredError = () =>
  new ErrorHandler(401, 'Your token has expired! Please log in again.');
const sendErrorDev = (
  err: { statusCode: any; status: any; message: any; stack: any },
  req: { originalUrl: string },
  res: {
    status: (arg0: any) => {
      (): any;
      new (): any;
      json: { (arg0: { status: any; error: any; message: any; stack: any }): any; new (): any };
      render: { (arg0: string, arg1: { title: string; msg: any }): any; new (): any };
    };
  },
) => {
  // A) API
  if (req.originalUrl.startsWith('/')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
const sendErrorProd = (
  err: { isOperational: any; statusCode: any; status: any; message: any },
  req: { originalUrl: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: any; message: any }): any; new (): any };
      render: { (arg0: string, arg1: { title: string; msg: any }): any; new (): any };
    };
  },
) => {
  // A) API
  if (req.originalUrl.startsWith('/')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};
const globalErrorHandler = (
  err: { statusCode: number; status: string; message: any } | any,
  req: any,
  res: any,
  next: any,
) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error: any = { ...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;

import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from 'typeorm';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

import pgconfig from './database/pgconfig';
import globalErrorHandler from './controllers/errorController';

createConnection(pgconfig)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log('err', err);
  });

dotenv.config();
const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req:Request, res: Response) => {
  res.redirect('/api/twitee/v1')
})
app.get('/api/twitee/v1', (req, res) => {
  res.send('Server is live 🚀')
})

app.use('/api/twitee/v1', indexRouter);
app.use('/api/twitee/v1/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can not find ${req.originalUrl} endpoint on this server`,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err: HttpError, req: Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(globalErrorHandler);

export default app;

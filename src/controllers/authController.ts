import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entities/userEntity';
import { getConnection, getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';
import sendEmail from '../utils/email';

const generateToken = (userId: number, email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const signup = catchAsync(async (req: Request, res: Response) => {
  const password = await bcrypt.hash(req.body.password, 12);
  const email = req.body.email;
  let name = email.replace(/@.*$/, '');
  const init = name.replace(name.charAt(0), name.charAt(0).toUpperCase());

  const data = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        name: init,
        email: req.body.email,
        password: password,
      },
    ])
    .returning('*')
    .execute();

  const token = generateToken(data.raw[0].id, data.raw[0].email);
  const user = data.raw;
  res.status(201).json({
    status: 'success',
    data: { user, token },
  });

  sendEmail(
    data.raw[0].email,
    'User Confirmation',
    `<p>Hello ${data.raw[0].name},</p><p>Thank you for signing up for a Twitee account.
         Welcome onboard!!!,</p>`,
  )
    .then(() => {
      console.log('email sent');
    })
    .catch((err) => {
      console.log(err);
    });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email: req.body.email })
    .getOne();

  if (!user) {
    return next(new ErrorHandler(401, 'invalid login credentials'));
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return next(new ErrorHandler(401, 'invalid login credentials'));
  }

  const token = generateToken(user.id, user.email);

  res.status(201).json({
    status: 'success',
    message: 'login successful',
    data: { user, token },
  });
});

export const protectRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler(401, 'You are not authorized! 🚨'));
  }

  const decodedToken: any = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
  const data = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email: decodedToken.email })
    .getOne();
  req.user = data;

  next();
});
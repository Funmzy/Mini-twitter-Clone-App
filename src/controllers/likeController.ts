import { NextFunction, Request, Response } from 'express';
import { Like } from '../entities/likeEntity';
import { getConnection, getRepository } from 'typeorm';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';

export const likeTwit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user.id;

  const isLiked = await getRepository(Like)
    .createQueryBuilder('like')
    .where('like.twit = :twit AND like.user = :user', { twit: req.params.id, user: user })
    .getOne();

  if (isLiked) {
    return next(new ErrorHandler(400, 'You have already liked this tweet'));
  }

  const data = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Like)
    .values([
      {
        twit: +req.params.id,
        user: user,
      },
    ])
    .returning('*')
    .execute();

  const like = data.raw;
  res.status(201).json({
    status: 'success',
    message: 'Twit liked!',
    like,
  });
});

export const unLikeTwit = catchAsync(async (req: Request, res: Response) => {
  const user = req.user.id;
  const data = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Like)
    .where('user = :user AND twit = :twit', {
      twit: +req.params.id,
      user: user,
    })
    .execute();

  res.status(201).json({
    status: 'success',
    message: 'Twit unliked!',
  });
});

export const getTwitLikes = catchAsync(async (req: Request, res: Response) => {
  const likes = await getRepository(Like)
    .createQueryBuilder('like')
    .leftJoinAndSelect('like.user', 'user')
    .where('like.twit = :twit', { twit: req.params.id })
    .getMany();

  res.status(201).json({
    status: 'success',
    message: "All Twit's likes!",
    likes,
  });
});

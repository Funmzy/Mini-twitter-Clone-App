import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Comment } from '../entities/commentEntity';
import catchAsync from '../utils/catchAsync';

export const postComment = catchAsync(async (req: Request, res: Response) => {
  const user = req.user.id;

  const data = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Comment)
    .values([
      {
        comment: req.body.comment,
        user: user,
        twit: +req.params.id,
      },
    ])
    .returning('*')
    .execute();
  const comment = data.raw;
  res.status(201).json({
    status: 'success',
    message: 'comment posted',
    comment,
  });
});

export const getTwitComments = catchAsync(async (req: Request, res: Response) => {
  const comments = await getRepository(Comment)
    .createQueryBuilder('comment')
    .leftJoinAndSelect('comment.user', 'user')
    .where('comment.twit = :twit', { twit: req.params.id })
    .getMany();

  res.status(201).json({
    status: 'success',
    message: "All Twit's comment!",
    comments,
  });
});

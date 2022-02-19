import { Request, Response } from 'express';
import { Twit } from '../entities/twitEntity';
import { Comment } from '../entities/commentEntity';
import { Like } from '../entities/likeEntity';
import { getConnection, getRepository } from 'typeorm';

import catchAsync from '../utils/catchAsync';

export const postTwit = catchAsync(async (req: Request, res: Response) => {
  const user = req.user.id;

  const data = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Twit)
    .values([
      {
        twit: req.body.twit,
        user: user,
      },
    ])
    .returning('*')
    .execute();

  const tweet = data.raw;
  res.status(201).json({
    status: 'success',
    message: 'twit created',
    tweet,
  });
});

export const deleteTwit = catchAsync(async (req: Request, res: Response) => {
  const user = req.user.id;
  const data = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Twit)
    .where('user = :user AND id = :id', {
      user: user,
      id: req.params.id,
    })
    .execute();

  res.status(201).json({
    status: 'success',
    message: 'twit deleted!',
  });
});

// const user = await createQueryBuilder("user")
//     .leftJoinAndSelect(Photo, "photo", "photo.userId = user.id")
//     .getMany();
// const users = 
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .leftJoinAndSelect("user.photos", "photo")
//     .getMany();


export const getAllTwits = catchAsync(async (req: Request, res: Response) => {
  const twits = await getConnection()
  .getRepository(Twit)
  .createQueryBuilder('twit')
  .leftJoinAndSelect("twit.comment", "comment")
  .leftJoinAndSelect("twit.like", "like")
  .getMany();


  res.status(201).json({
    status: 'success',
    message: 'All twits!',
    twits,
  });
});

export const getTwitCommentLike = catchAsync(async (req: Request, res: Response) => {
  const twits = await getRepository(Twit)
    .createQueryBuilder('twit')
    .leftJoinAndSelect('twit.user', 'user')
    .where('twit.id = :id', { id: req.params.id })
    .getOne();

  const comments = await getRepository(Comment)
    .createQueryBuilder('comment')
    .leftJoinAndSelect('comment.user', 'user')
    .where('comment.twit = :twit', { twit: req.params.id })
    .getMany();

  const likes = await getRepository(Like)
    .createQueryBuilder('like')
    .where('like.twit = :twit', { twit: req.params.id })
    .getCount();

  res.status(201).json({
    status: 'success',
    message: "A twit and it's comment!",
    twits: {
      twits,
      comments,
      likes,
    },
  });
});

export const getAllUserTwits = catchAsync(async (req: Request, res: Response) => {
  const twits = await getRepository(Twit)
    .createQueryBuilder('twit')
    .where('twit.user = :user', { user: req.user.id })
    .getMany();

  res.status(201).json({
    status: 'success',
    message: "All User's twits!",
    twits,
  });
});

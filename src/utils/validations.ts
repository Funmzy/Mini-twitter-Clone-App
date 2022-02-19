import Joi from 'joi';
import { IUser, ILogin, IComment, ITwit } from './interfaces';

export const validateUser = (user: IUser) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(2).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(user);
};

export const validateLogin = (user: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(user);
};

export const validateTwit = (twit: ITwit) => {
  const schema = Joi.object({
    id: Joi.number(),
    twit: Joi.string().min(1).required(),
  });
  return schema.validate(twit);
};

export const validateComment = (comment: IComment) => {
  const schema = Joi.object({
    id: Joi.number(),
    comment: Joi.string().min(1).required(),
  });
  return schema.validate(comment);
};

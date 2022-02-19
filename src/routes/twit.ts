import {
  postTwit,
  deleteTwit,
  getAllTwits,
  getAllUserTwits,
  getTwitCommentLike,
} from '../controllers/twitController';
import express from 'express';
import validationMiddleware from '../middleware/validationMiddleware';
import { validateTwit } from '../utils/validations';

const router = express.Router();

router.post('/', [validationMiddleware(validateTwit)], postTwit);
router.delete('/:id', deleteTwit);
router.get('/:id', getTwitCommentLike);
router.get('/', getAllTwits);
router.get('/:userId/user', getAllUserTwits);

export default router;

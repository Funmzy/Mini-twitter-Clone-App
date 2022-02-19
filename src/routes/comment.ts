import { postComment, getTwitComments } from '../controllers/commentController';
import express from 'express';
import validationMiddleware from '../middleware/validationMiddleware';
import { validateComment } from '../utils/validations';

const router = express.Router();

//Comment router
router.post('/:id', [validationMiddleware(validateComment)], postComment);
router.get('/:id', getTwitComments);

export default router;

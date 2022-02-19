import express from 'express';
import { getTwitLikes, likeTwit, unLikeTwit } from '../controllers/likeController';

const router = express.Router();

router.post('/:id', likeTwit);
router.get('/:id', getTwitLikes);
router.delete('/:id', unLikeTwit);

export default router;

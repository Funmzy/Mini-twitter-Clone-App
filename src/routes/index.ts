import express, { Request, Response, NextFunction } from 'express';
import { protectRoute } from '../controllers/authController';
import twitRoute from './twit';
import likeRoute from './like';
import commentRoute from './comment';

const router = express.Router();
/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

router.use('/twit', protectRoute, twitRoute);
router.use('/like', protectRoute, likeRoute);
router.use('/comment', protectRoute, commentRoute);

export default router;

import express, {Request, Response, NextFunction} from 'express';
import { signup, login } from "../controllers/authController";
import validationMiddleware from '../middleware/validationMiddleware';
import { validateLogin, validateUser } from "../utils/validations";


const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

router.post("/signup", [validationMiddleware(validateUser)], signup);
router.post("/login", [validationMiddleware(validateLogin)], login);

export default router;

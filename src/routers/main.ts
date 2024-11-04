import { Router } from 'express';
import * as pingController from '../controllers/ping';
import * as authController from '../controllers/auth';
import * as privateController from '../controllers/private';
import { verifyJWT } from '../libs/jwt';

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.post('/auth/sign-in', authController.signIn);
mainRouter.post('/auth/signup', authController.signup);

mainRouter.post('/auth/use-otp', authController.useOTP);

mainRouter.get('/private', verifyJWT, privateController.ping);

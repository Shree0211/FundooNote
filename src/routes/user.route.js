import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuthpassword } from '../middlewares/auth.middleware';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//router.get('/registration', userController.registration);
router.post('/login', userController.login);

//route to create a new user
 router.post('/res', newUserValidator, userController.newUser);

 router.post('/forgotpassword', userController.forgotpassword);

 router.put('/resetpassword', userAuthpassword, userController.resetpassword);

export default router;

import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//router.get('/registration', userController.registration);
router.post('/login', userController.login);

//route to create a new user
 router.post('', newUserValidator, userController.newUser);

 router.post('/forgotpassword', userController.forgotpassword);

 router.put('/resetpassword', userController.resetpassword);

export default router;

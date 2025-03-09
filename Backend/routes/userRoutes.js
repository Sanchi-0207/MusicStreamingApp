import express from 'express';
import {register,login,getName} from '../controller/userController.js';
import {auth} from '../middleware/auth.middleware.js';
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/name',auth,getName);
export default router;
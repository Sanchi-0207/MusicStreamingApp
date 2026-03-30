import express from 'express';
<<<<<<< HEAD
import {register,login,getName,forgotPass,otp,resetPass,getSongs,setUserAsArtist,uploadSongs} from '../controller/userController.js';
import {auth} from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';
=======
import {register,login,getName,forgotPass,otp,resetPass} from '../controller/userController.js';
import {auth} from '../middleware/auth.middleware.js';
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/name',auth,getName);
<<<<<<< HEAD
router.get('/songs',getSongs);
router.post('/forgot',forgotPass);
router.post('/reset',resetPass);
router.post('/otp',otp);
router.post('/artist',auth,setUserAsArtist);
router.post('/upload',auth,authorizeRole("artist"),uploadSongs);
=======
router.post('/forgot',forgotPass);
router.post('/reset',resetPass);
router.post('/otp',otp);
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
export default router;
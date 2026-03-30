<<<<<<< HEAD

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export class TokenService{
     createToken(object){
      return jwt.sign(object, process.env.SECRET_KEY, { expiresIn: '1d' });
    }
    verifyToken(token){
      try {
        return jwt.verify(token, process.env.SECRET_KEY); 
      } 
      catch (error) {
        throw Error(`Invalid token ${error}`);
=======
import jwt from 'jsonwebtoken';

export class TokenService{
     createToken(email,SECRET_KEY){
      return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    }
    verifyToken(token,SECRET_KEY){
      try {
        return jwt.verify(token, SECRET_KEY);
      } 
      catch (error) {
        throw Error('Invalid token');
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
      }
    }
}
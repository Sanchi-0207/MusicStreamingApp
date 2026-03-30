
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
      }
    }
}
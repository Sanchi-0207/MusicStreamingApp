import jwt from 'jsonwebtoken';

export class TokenService{
     createToken(userName,SECRET_KEY){
      return jwt.sign({ userName }, SECRET_KEY, { expiresIn: '1h' });
    }
    verifyToken(token,SECRET_KEY){
      try {
        return jwt.verify(token, SECRET_KEY);
      } 
      catch (error) {
        throw Error('Invalid token');
      }
    }
}
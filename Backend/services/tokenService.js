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
      }
    }
}
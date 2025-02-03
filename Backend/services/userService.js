var user=[];
import jwt from 'jsonwebtoken';

export class AuthService{
       register(userName,password){
        if(user.find((item)=> item.userName === userName )){
          throw Error('User already present');
        }
        const data={userName,password};
        user.push(data);
        return data;
      }
      signin(userName,password){
        const findingUser=user.find((item)=>item.userName===userName);
           if(!findingUser){
            throw Error('No user found');
           }
           if(findingUser.password!=password){
             throw Error('Incorrect password');
           }
           return 'Login successful';
        } 
    }
    
export class TokenService{
          static createToken(userName,SECRET_KEY){
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


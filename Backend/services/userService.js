import {TokenService} from './tokenService.js';

var user=[];
export class AuthService{
       register(userName,password,secret_key){
        const tokenService=new TokenService();
        const token=tokenService.createToken(userName,secret_key);
        if(user.find((item)=> item.userName === userName )){
          throw Error('User already present');
        }
        const data={userName,password};
        user.push(data);
        return {data,token};
      }
      signin(userName,password,secret_key){
        const findingUser=user.find((item)=>item.userName===userName);
        const tokenService=new TokenService();
        const token=tokenService.createToken(userName,secret_key);
           if(!findingUser){
            throw Error('No user found');
           }
           if(findingUser.password!=password){
             throw Error('Incorrect password');
           }
           return {message:'Login successful',token:token};
        } 
    }
    



import {TokenService} from './tokenService.js';
import dotenv from 'dotenv';
dotenv.config();
const secret_key=process.env.secret_key;
var user=[];
export class AuthService{
       register(userName,password){
        const tokenService=new TokenService();
        const token=tokenService.createToken(userName,secret_key);
        if(user.find((item)=> item.userName === userName )){
          throw Error('User already present');
        }
        const data={userName,password};
        user.push(data);
        return {data,token};
      }
      signin(userName,password){
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
    



import {TokenService} from './tokenService.js';
import dotenv from 'dotenv';
import {fetchData} from '../dataAccess/fetchData.js';
dotenv.config();
const secret_key=process.env.secret_key;
export class AuthService{
       async register(userName,password,name){
        const tokenService=new TokenService();
        const token=tokenService.createToken(userName,secret_key);
        const user=new fetchData();
        const existingUser=await user.findUser(userName);
        if(existingUser){
          throw Error('User already present');
        }
        const newUser=await user.createUser(userName,password,name);
        
        return {newUser,token};
      }
      async signin(userName,password){
        const user= new fetchData();
        const findingUser=await user.findUser(userName);
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
      getName(userName){
        const findingUser=user.find((item)=>item.userName===userName);
        if(!findingUser){
          throw Error('No user found');
        }
        const name=findingUser.name;
        return {name};
      }
    }

   



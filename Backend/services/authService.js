import {TokenService} from './tokenService.js';
import dotenv from 'dotenv';
import {FetchData} from '../dataAccess/fetchData.js';
dotenv.config();
const secret_key=process.env.secret_key;
export class AuthService{
       async register(userName,password,name){
        const userData=new FetchData();
        const existingUser=await userData.findUser(userName);
        if(existingUser){
          throw Error('User already present');
        }
        const tokenService=new TokenService();
        const token=tokenService.createToken(userName,secret_key);
        const newUser=await userData.createUser(userName,password,name);
        
        return {newUser,token};
      }
      async signin(userName,password){
        const userData= new FetchData();
        const existingUser=await userData.findUser(userName);
        if(!existingUser){
          throw Error('No user found');
         }
        const tokenService=new TokenService();
        const token=tokenService.createToken(userName,secret_key);
           if(existingUser.password!=password){
             throw Error('Incorrect password');
           }
           return {message:'Login successful',token:token};
        } 
      async getName(userName){
        const userData=new FetchData();
        const existingUser=await userData.findUser(userName);
        if(!existingUser){
          throw Error('No user found');
        }
        const name=existingUser.name;
        return {name};
      }
    }

   



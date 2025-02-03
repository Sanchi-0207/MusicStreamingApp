import {AuthService} from '../services/userService.js';
import dotenv from 'dotenv';
dotenv.config();
const secret_key=process.env.SECRET_KEY;
 export const register=(request,response)=>{
   const data={
    userName:request.body.name,
    password:request.body.password,
   }
   try{
    const authService=new AuthService();
    const result =authService.register(data.userName,data.password,secret_key);
    response.status(200).json({data:result.data,token:result.token});
   }
   catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const login=(request,response)=>{
     const userName=request.body.name;
     const password=request.body.password;
     try{
      const authService=new AuthService();
      const result= authService.signin(userName,password,secret_key);
      response.status(200).json({message:result.message,token:result.token});
     }
     catch(error){
      response.status(404).json({error:error.message});
      response.status(401).json({error:error.message})
    } 

 };
 
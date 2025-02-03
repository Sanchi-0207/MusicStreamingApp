import {AuthService,TokenService} from '../services/userService.js';
import dotenv from 'dotenv';
dotenv.config();
const Secret_Key=process.env.SECRET_KEY;
 export const register=(request,response)=>{
   const data={
    userName:request.body.name,
    password:request.body.password,
   }
   try{
    const auth=new AuthService();
    const result =auth.register(data.userName,data.password);
    const token=TokenService.createToken(data.userName,Secret_Key);
    response.status(200).json({Data:result,Token:token});
   }
   catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const login=(request,response)=>{
     const userName=request.body.name;
     const password=request.body.password;
     const token=TokenService.createToken(userName,Secret_Key);
     try{
      const login =new AuthService();
      const result= login.signin(userName,password);
      response.status(200).json({message:result,token:token});
     }
     catch(error){
      response.status(404).json({error:error.message});
      response.status(401).json({error:error.message})
    } 

 };
 
import {AuthService} from '../services/authService.js';
import dotenv from 'dotenv';
dotenv.config();
 export const register=async (request,response)=>{
   const data={
    userName:request.body.userName,
    password:request.body.password,
    name:request.body.name,
   }
   try{
    const authService=new AuthService();
    const result =await authService.register(data.userName,data.password,data.name);
    response.status(200).json({data:result.newUser,token:result.token});
   }
   catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const login=async(request,response)=>{
     const userName=request.body.userName;
     const password=request.body.password;
     try{
      const authService=new AuthService();
      const result=await authService.signin(userName,password);
      response.status(200).json({message:result.message,token:result.token});
     }
     catch(error){
      const statuscode=error.message==='No user found'?404:401;
      response.status(statuscode).json({error:error.message});
    } 
 };

 export const getName=async (request,response)=>{
  const authService=new AuthService();
  const username=request.body.userName;
    const name=await authService.getName(username);
    response.status(200).json({name:name});
 };
 
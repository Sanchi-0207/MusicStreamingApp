import {AuthService} from '../services/authService.js';
import dotenv from 'dotenv';
dotenv.config();
 export const register=async (request,response)=>{
   const data={
    email:request.body.email,
    password:request.body.password,
    name:request.body.name,
   }
   try{
    const authService=new AuthService();
    const result =await authService.register(data.email,data.password,data.name);
    response.status(200).json({data:result.userInfo,token:result.token});
   }
   catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const otp=async(request,response)=>{
  const data={
    email:request.body.email,
    OTP:request.body.OTP
  }
  try{
    const authService=new AuthService();
    const result= await authService.enterOTP(data.email,data.OTP);
    response.status(200).json({data:result.newUser ,message:result.message});
  }
  catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const login=async(request,response)=>{
     const email=request.body.email;
     const password=request.body.password;
     try{
      const authService=new AuthService();
      const result=await authService.signin(email,password);
      response.status(200).json({message:result.message,token:result.token});
     }
     catch(error){
      const statuscode=error.message==='No user found'?404:401;
      response.status(statuscode).json({error:error.message});
    } 
 };
 export const forgotPass=async(request,response)=>{
    const email=request.body.email;
    try{
      const authService=new AuthService();
      const result=await authService.forgotPassword(email);
      if (result.error) {
        return response.status(400).json({ error: result.error });
      }
      response.status(200).json({data:result.userInfo,message:result.message});
    }
    catch(error){
      response.status(400).json({ error: error.message });
    }
 };
 export const resetPass=async(request,response)=>{
  const data={
    email:request.body.email,
    newPass:request.body.newPass,
    otp:request.body.otp
  }
  try{
    const authService=new AuthService();
      const result=await authService.resetPassword(data.email,data.newPass,data.otp);
      if (result.error) {
        return response.status(400).json({ error: result.error });
      }
      response.status(200).json({data:result.newPassword});
    }
    catch(error){
      response.status(400).json({ error: error.message });
  }
 };

 export const getName=async (request,response)=>{
  const authService=new AuthService();
  const email=request.body.userName;
    const name=await authService.getName(email);
    response.status(200).json({name:name});
 };
 
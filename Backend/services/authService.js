import {TokenService} from './tokenService.js';
import dotenv from 'dotenv';
import {FetchData} from '../dataAccess/fetchData.js';
import{OTP} from './otpService.js';
dotenv.config();
const secret_key=process.env.secret_key;
export class AuthService{
       async register(email,password,name){
        const userData=new FetchData();
        const existingUser=await userData.findUser(email);
        if(existingUser){
          throw Error('User already present');
        }
        const generateOTP=new OTP();
        const otp=await generateOTP.sendOTP(email);
        const userInfo=await userData.storeOTP(email,password,name,otp);
        const tokenService=new TokenService();
        const token=tokenService.createToken(email,secret_key);

        return {userInfo,token};
      }
      async enterOTP(email,Otp){
        const userData=new FetchData();
        const generateOTP=new OTP();
        const verifiedOTP=await generateOTP.verifyOTP(email,Otp)
        if(verifiedOTP.message !== "OTP Verified"){
          throw Error('Incorrect OTP');
        }
        const existingUser=await userData.findOtp(email);
        const newUser=await userData.createUser(existingUser.email,existingUser.password,existingUser.name);
        return {newUser,message:verifiedOTP.message};
      }
      async signin(email,password){
        const userData= new FetchData();
        const existingUser=await userData.findUser(email);
        if(!existingUser){
          throw Error('No user found');
         }
        const tokenService=new TokenService();
        const token=tokenService.createToken(email,secret_key);
           if(existingUser.password!=password){
             throw Error('Incorrect password');
           }
           return {message:'Login successful',token:token};
        } 
        async forgotPassword(email){
          const userData= new FetchData();
          const existingUser=await userData.findUser(email);
          if(!existingUser){
            throw Error('User not Registered');
          }
          const generateOTP = new OTP();
          const otp= await generateOTP.sendOTP(email);
          const userInfo=await userData.storeOTP(email,null,null,otp);
          return {userInfo,message: "OTP sent successfully" };
        } 
        async resetPassword(email,newPass,otp){
          const userData= new FetchData();
          const generateOTP = new OTP();
          const verifiedOTP= await generateOTP.verifyOTP(email,otp);
          if(verifiedOTP.message !== "OTP Verified"){
            throw Error("Incorrect OTP");
          }
          const newPassword=await userData.updatePassword(email,newPass);
          return {newPassword};
        } 

      async getName(email){
        const userData=new FetchData();
        const existingUser=await userData.findUser(email);
        if(!existingUser){
          throw Error('No user found');
        }
        const name=existingUser.name;
        return {name};
      }
    }

   



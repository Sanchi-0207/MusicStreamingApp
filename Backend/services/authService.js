import {TokenService} from './tokenService.js';
<<<<<<< HEAD
import {User} from '../dataAccess/user.js';
import{OTP} from './otpService.js';
export class AuthService{
   constructor(userparam = new User(),tokenparam=new TokenService(),otpparam=new OTP()){
        this.user = userparam;
        this.token= tokenparam;
        this.otp=otpparam;
    }

       async register(email,password,name){
        const existingUser=await this.user.findUser(email);
        if(existingUser){
          throw Error('User already present');
        }
        const otp=await this.otp.sendOTP(email);
        const userInfo=await this.user.storeOTP(email,password,name,otp);
        return {};
      }
      async verifyOTP(email,otp){
        const verifiedOTP=await this.otp.verifyOTP(email,otp);
        if(verifiedOTP.message !== "OTP Verified"){
          throw Error('Incorrect OTP');
        }
        const existingUser=await this.user.findOtp(email);
        const newUser=await this.user.createUser(existingUser.email,existingUser.password,existingUser.name);
        const token=this.token.createToken(newUser);

        return {newUser,token,message:verifiedOTP.message};
      }
      async login(email,password){
        const existingUser=await this.user.findUser(email);
        if(!existingUser){
          throw Error('No user found');
         }
           if(existingUser.password!=password){
             throw Error('Incorrect password');
           }
        const token=this.token.createToken(existingUser);
           return {existingUser,message:'Login successful',token:token};
        } 
        async forgotPassword(email){
          const existingUser=await this.user.findUser(email);
          if(!existingUser){
            throw Error('User not Registered');
          }
          const otp= await this.otp.sendOTP(email);
          const userInfo=await this.user.storeOTP(email,null,null,otp);
          return {message: "OTP sent successfully" };
        } 
        async resetPassword(email,newPass,otp){
          const verifiedOTP= await this.otp.verifyOTP(email,otp);
          if(verifiedOTP.message !== "OTP Verified"){
            throw Error("Incorrect OTP");
          }
          const newPassword=await this.user.updatePassword(email,newPass);
=======
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
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
          return {newPassword};
        } 

      async getName(email){
<<<<<<< HEAD
        const existingUser=await this.user.findUser(email);
=======
        const userData=new FetchData();
        const existingUser=await userData.findUser(email);
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
        if(!existingUser){
          throw Error('No user found');
        }
        const name=existingUser.name;
        return {name};
      }
    }

   



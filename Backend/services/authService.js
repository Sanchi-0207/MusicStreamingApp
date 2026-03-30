import {TokenService} from './tokenService.js';
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
          return {newPassword};
        } 

      async getName(email){
        const existingUser=await this.user.findUser(email);
        if(!existingUser){
          throw Error('No user found');
        }
        const name=existingUser.name;
        return {name};
      }
    }

   



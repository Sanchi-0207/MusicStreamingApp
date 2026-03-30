import sendMail from './mailer.js';
import {User} from '../dataAccess/user.js';
export class OTP{
    async sendOTP(email){
        const otp = Math.floor(1000 + Math.random() * 9000);
        await sendMail(email,"Forgot Password",`Your OTP is :${otp}`);
        return otp;
    }
    async verifyOTP(email,Otp){
       const userInfo=new User();
       const existingUser= await userInfo.findOtp(email);
       if(existingUser.otp!=Otp){
        throw Error("Incorrect OTP");
       }
       return {message:"OTP Verified"};
    }


}
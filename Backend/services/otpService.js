import sendMail from './mailer.js';
import {FetchData} from '../dataAccess/fetchData.js';
export class OTP{
    async sendOTP(email){
        const otp = Math.floor(1000 + Math.random() * 9000);
        await sendMail(email,"Forgot Password",`Your OTP is :${otp}`);
        return otp;
    }
    async verifyOTP(email,Otp){
       const fetchdata=new FetchData();
       const existingUser= await fetchdata.findOtp(email);
       if(existingUser.otp!=Otp){
        throw Error("Incorrect OTP");
       }
       return {message:"OTP Verified"};
    }


}
import sendMail from './mailer.js';
<<<<<<< HEAD
import {User} from '../dataAccess/user.js';
=======
import {FetchData} from '../dataAccess/fetchData.js';
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
export class OTP{
    async sendOTP(email){
        const otp = Math.floor(1000 + Math.random() * 9000);
        await sendMail(email,"Forgot Password",`Your OTP is :${otp}`);
        return otp;
    }
    async verifyOTP(email,Otp){
<<<<<<< HEAD
       const userInfo=new User();
       const existingUser= await userInfo.findOtp(email);
=======
       const fetchdata=new FetchData();
       const existingUser= await fetchdata.findOtp(email);
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
       if(existingUser.otp!=Otp){
        throw Error("Incorrect OTP");
       }
       return {message:"OTP Verified"};
    }


}
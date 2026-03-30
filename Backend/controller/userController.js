import {AuthService} from '../services/authService.js';
<<<<<<< HEAD
import{SongService} from '../services/songService.js';
import {Song} from '../dataAccess/song.js';
import {User} from '../dataAccess/user.js';
import {TokenService} from '../services/tokenService.js';
import dotenv from 'dotenv';
dotenv.config();

const user = new User();
const song= new Song();
const songService=new SongService();
const tokenService = new TokenService();
const authService = new AuthService();

=======
import dotenv from 'dotenv';
dotenv.config();
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
 export const register=async (request,response)=>{
   const data={
    email:request.body.email,
    password:request.body.password,
    name:request.body.name,
   }
   try{
<<<<<<< HEAD
    const result =await authService.register(data.email,data.password,data.name);
    response.status(200).json({message:"OTP sent"});
=======
    const authService=new AuthService();
    const result =await authService.register(data.email,data.password,data.name);
    response.status(200).json({data:result.userInfo,token:result.token});
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
   }
   catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const otp=async(request,response)=>{
  const data={
    email:request.body.email,
<<<<<<< HEAD
    otp:request.body.otp
  }
  try{
    const result= await authService.verifyOTP(data.email,data.otp);
    response.status(200).json({data:result.newUser ,token:result.token  ,message:result.message});
=======
    OTP:request.body.OTP
  }
  try{
    const authService=new AuthService();
    const result= await authService.enterOTP(data.email,data.OTP);
    response.status(200).json({data:result.newUser ,message:result.message});
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
  }
  catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const login=async(request,response)=>{
     const email=request.body.email;
     const password=request.body.password;
     try{
<<<<<<< HEAD
      const result=await authService.login(email,password);
      response.status(200).json({data:result.existingUser, message:result.message,token:result.token});
=======
      const authService=new AuthService();
      const result=await authService.signin(email,password);
      response.status(200).json({message:result.message,token:result.token});
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
     }
     catch(error){
      const statuscode=error.message==='No user found'?404:401;
      response.status(statuscode).json({error:error.message});
    } 
 };
 export const forgotPass=async(request,response)=>{
    const email=request.body.email;
    try{
<<<<<<< HEAD
=======
      const authService=new AuthService();
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
      const result=await authService.forgotPassword(email);
      if (result.error) {
        return response.status(400).json({ error: result.error });
      }
<<<<<<< HEAD
      response.status(200).json({message:result.message});
=======
      response.status(200).json({data:result.userInfo,message:result.message});
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
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
<<<<<<< HEAD
=======
    const authService=new AuthService();
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
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
<<<<<<< HEAD
  const email=request.body.decodedToken.email;
    const name=await authService.getName(email);
    response.status(200).json({name:name});
 };
  export const getSongs=async(request,response)=>{
    try{
    const songs=await song.songData();
    response.status(200).json({songs:songs});
    }
    catch(error){
      response.status(400).json({error:"Error fetching songs"});
    }
  }

  export const setUserAsArtist=async(request,response)=>{
    try{
       const email=request.body.decodedToken.email;
       const assignedRole=await user.upgradeToArtist(email);
       const newToken = tokenService.createToken(assignedRole);
       response.status(200).json({RoleChangedTo:assignedRole,token:newToken});
    }
    catch(error){
      console.log(error);
      response.status(400).json({error:"Cannot Change Role"});
    }
  }
  export const uploadSongs = async (request, response) => {
  try {
    let data = "";
    let songName = "";
    let songFile = null;
    let songCover = null;
    request.on("data", chunk => {
      data += chunk.toString("binary");
    });

    request.on("end", async () => {
      const boundary = request.headers["content-type"].split("boundary=")[1];
      const parts = data.split(`--${boundary}`);

      parts.forEach(part => {
        if (part.includes('name="songName"')) {
          songName = part.split("\r\n\r\n")[1]?.trim();
        }

        if (part.includes('name="song"')) {
          const fileData = part.split("\r\n\r\n")[1];
          songFile = Buffer.from(fileData, "binary");
        }

        if (part.includes('name="cover"')) {
          const fileData = part.split("\r\n\r\n")[1];
          songCover = Buffer.from(fileData, "binary"); 
        }
      });
      const result = await songService.uploadSong(songName, songFile, songCover);
      response.status(200).json({ message: "Uploaded Song Successfully", result });
    });

  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};
 /*export const searchBar=async (request,response)=>{
  try{
   const songName=request.body.songName;
   const result=await song.searchSong(songName);
   response.status(200).json({message:"Related Search",result})
  }
  catch(error){
    response.status(400).json({error:" "});
  }
 };*/
=======
  const authService=new AuthService();
  const email=request.body.userName;
    const name=await authService.getName(email);
    response.status(200).json({name:name});
 };
 
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0

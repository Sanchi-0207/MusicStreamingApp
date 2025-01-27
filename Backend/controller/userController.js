import {userData,findUser} from '../services/userService.js';
 export const register=(request,response)=>{
   const data={
    userName:request.body.name,
    password:request.body.password,
   }
   const foundUser=findUser(data.userName);
   if(foundUser){
    response.json('User already exists');
   }
   else{
   userData(data.userName,data.password);
   response.json({Data:data});
   }
 };
 export const login=(request,response)=>{
     const userName=request.body.name;
     const password=request.body.password;
     const foundUser=findUser(userName);
     if(!foundUser){
      response.json('No user found');
     }
     if(foundUser.password===password){
      response.json('Login successful');
     }
     else{
      response.json('Incorrect password');
     }

 };
 
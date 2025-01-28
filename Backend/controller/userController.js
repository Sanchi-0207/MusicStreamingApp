import {authService,loginService,findUser} from '../services/userService.js';
 export const register=(request,response)=>{
   const data={
    userName:request.body.name,
    password:request.body.password,
   }
   try{
    const auth=new authService();
    const result =auth.register(data.userName,data.password);
    response.status(200).json({Data:result});
   }
   catch(error){
    response.status(400).json({error: error.message})
   }
 };
 export const login=(request,response)=>{
     const userName=request.body.name;
     const password=request.body.password;
     try{
      const login =new loginService();
      const result= login.signin(userName,password);
      response.status(200).json(result);
     }
     catch(error){
      response.status(404).json({error:error.message});
      response.status(401).json({error:error.message})
    } 

 };
 
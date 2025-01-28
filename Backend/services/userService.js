var user=[];
export const userData=(userName,password)=>{
    user.push({userName, password });
}
export const findUser=(userName) =>{
      return user.find((item) => item.userName === userName);
    }
export class authService{
       register(userName,password){
        if(user.find((item)=> item.userName === userName )){
          throw Error('User already present');
        }
        const data={userName,password};
        user.push(data);
        return data;
      }
    }
export class loginService{
  signin(userName,password){
  const findingUser=user.find((item)=>item.userName===userName);
     if(!findingUser){
      throw Error('No user found');
     }
     if(findingUser.password!=password){
       throw Error('Incorrect password');
     }
     return 'Login successful';
  }
}

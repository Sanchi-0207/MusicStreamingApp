var user=[];
export const userData=(userName,password)=>{
    user.push({userName, password });
}
export const findUser=(userName) =>{
      return user.find((item) => item.userName === userName);
    }

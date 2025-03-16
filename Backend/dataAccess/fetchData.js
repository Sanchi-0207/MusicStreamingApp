import {PrismaClient} from '@prisma/client';
const prisma=new PrismaClient();
export class FetchData{
   async createUser(userName,password,name){
      const newUser=await prisma.user.create({
        data:{
            userName:userName,
            password:password,
            name:name
        }
      })
      return newUser;
   }
   async findUser(userName){
    const findingUser= await prisma.user.findUnique({
        where:{userName},
    })
    return findingUser;
   }
}

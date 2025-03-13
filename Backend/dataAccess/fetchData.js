import {PrismaClient} from '@prisma/client';
const prisma=new PrismaClient();
export class fetchData{
   async createUser(userName,password,name){
      const NewUser=await prisma.user.create({
        data:{
            userName:userName,
            password:password,
            name:name
        }
      })
      return NewUser;
   }
   async findUser(userName){
    const findingUser= await prisma.user.findUnique({
        where:{userName}
    })
    return findingUser;
   }
}

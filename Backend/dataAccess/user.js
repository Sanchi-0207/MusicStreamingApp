import {PrismaClient} from '@prisma/client';
const prisma=new PrismaClient();
export class User{
  
   async storeOTP(email, password, name, otp) {
    const addUser = await prisma.oTP.upsert({
      where: { email: email },                   
      update: { 
        otp: otp, 
        password: password, 
        name: name 
      },    
      create: { 
        email: email, 
        password: password, 
        name: name, 
        otp: otp 
      } 
    });
    return addUser;
  }

   async createUser(email,password,name){
      const newUser=await prisma.user.create({
        data:{
            email:email,
            password:password,
            name:name
        }
      })
      return newUser;
   }
   async updatePassword(email,newPassword){
      const updatedPass=await prisma.user.update({
        where:{email:email},
        data:{password:newPassword},
      });
      return {updatedPass};
   }
   async findUser(email){
    const findingUser= await prisma.user.findUnique({
        where:{email},
    })
    return findingUser;
   }
   async findOtp(email){
    const findingUser= await prisma.oTP.findUnique({
        where:{email},
    })
    return findingUser;
   }
  }
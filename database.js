import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function database() {
  const existingUser=await prisma.user.findUnique({
    where:{userName:"Sanchi123"},
  })
  if(existingUser){
    console.log("user already present");
  }
  else{
  try {
   const newUser= await prisma.user.create({
    data:{
       name:"Sanchi",
       userName:"Sanchi123"
    }
   });
   console.log("User Created",newUser);
   const users=await prisma.user.findMany();
   console.log(users);
   const updateUser=await prisma.user.update({
      where:{userName:"Sanchi123"},
      data:{name:"Sanchi Updated"}
   });
   console.log("Updated User",updateUser);
}
  catch (error) {
    console.error("❌ ", error);
  }  
  finally {
    await prisma.$disconnect();
  }
}
}

database();
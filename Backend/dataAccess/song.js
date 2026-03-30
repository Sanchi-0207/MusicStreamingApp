import {PrismaClient} from '@prisma/client';
const prisma=new PrismaClient();
export class Song{
async songData(){
  const songs=await prisma.song.findMany();
  return songs;
 }
 async upgradeToArtist(email){
  const updatedUser= await prisma.user.update({
    where:{email},
    data:{role:"artist"},
  })
  return updatedUser;
 }
 async addSong(songName,songPath,coverPath){
  const newSong=await prisma.song.create({
      data:{
        title:songName,
        audio_url:songPath,
        cover_url:coverPath,
      }
  })
      return newSong;
 }
 /*async searchSong(songName){
  const song=await prisma.song.findMany({
    where:{title:songName},
  })
  return song;
 }
}*/
}
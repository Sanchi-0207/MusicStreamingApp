import fs from "fs";
import {Song} from '../dataAccess/song.js';
export class SongService {
    constructor(songparam = new Song()){
        this.song = songparam
    };

      async uploadSong(songName,songFile,songCover) {
            try{
            const songPath = `/assets/songs/${songName}.mp3`;
            const coverPath = `/assets/covers/${songName}.jpeg`;   
            fs.writeFileSync(`.${songPath}`, songFile);
            fs.writeFileSync(`.${coverPath}`, songCover);
            const uploadSong=await this.song.addSong(songName,songPath,coverPath);
          return{uploadSong,message:"Song Uploaded successfully"};
            }
            catch(error){
              console.log(error);
                throw Error("Unable to upload the song");
            }
  } 
}
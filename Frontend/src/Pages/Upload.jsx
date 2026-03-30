import {upload} from "../Api/auth.routes";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../constants/appConstants";
import { useState } from "react";
function Upload(){
    const navigate=useNavigate();
   const[songName,setSongName]=useState("");
   const[song,setSong]=useState(null);
   const[cover,setCover]=useState(null);
   const[error,setError]=useState("");
const handleSubmit = async (e) => {
   e.preventDefault();
   try{
     const res= await upload({songName,song,cover});
     navigate(AppConstants.HOME_PAGE);
   }
   catch(err){
        setError(err.response?.data?.error || "Something went wrong");
   }


};
    return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg w-80"
      >
        <h2 className="text-xl font-semibold text-center">Upload Song</h2>

        <input
          type="text"
          placeholder="Song Name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setSong(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
export default Upload;
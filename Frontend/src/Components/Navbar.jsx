import { useEffect, useState } from "react";
import { upgradeToArtist } from "../Api/auth.routes.js";

function Navbar({isArtist,setIsArtist}) {
  const [loading, setLoading] = useState(false);
      console.log(isArtist);
  const handleBecomeArtist = async () => {
    try {
      setLoading(true);
      const res = await upgradeToArtist();
      localStorage.setItem("userInfo",JSON.stringify(res.data));
      setIsArtist(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-wide">
          My Music App
        </h1>
        <div className="flex items-center gap-4 ml-auto">
          <button
            onClick={handleBecomeArtist}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50"
          >  
            {loading ? "Become Artist" : "Artist"}
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
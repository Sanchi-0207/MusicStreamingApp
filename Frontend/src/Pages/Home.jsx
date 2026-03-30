import { getSongs } from "../Api/auth.routes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../constants/appConstants";

function Home({isArtist}) {
  const navigate=useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const[activeSong,setActiveSong]=useState(null);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getSongs();
        setSongs(response.data.songs);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      }
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <div className="pt-20">
        <h2 className="text-2xl font-semibold px-6 mt-4">All Songs</h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px", paddingLeft: "24px" }}>
            {error}
          </p>
        )}
        <div style={styles.songsContainer}>
          {songs.map((song) => (
       <div key={song._id} onClick={() => setActiveSong(song.id)} style={styles.songCard}>
            <div key={song.id} style={styles.songCard}>
              <div style={styles.poster}>
                <img
                  src={`${BASE_URL}${song.cover_url}`}
                  alt={song.title}
                  style={styles.image}
                />
              </div>
              <h3 style={styles.songTitle}>{song.title}</h3>
              
              
              {activeSong===song.id &&
              (<audio
                controls
                style={styles.songAudio}
                src={`${BASE_URL}${song.audio_url}`}
              ></audio>)}
              </div>
            </div>
            
          ))}
        </div>
      </div>
      {isArtist && (
  <button
    onClick={() => navigate(AppConstants.UPLOAD_SONG_PAGE)}
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white text-4xl flex items-center justify-center shadow-lg z-50"
  >
    +
  </button>
)}
    </div>
  );
}

export default Home;

const styles = {
  songsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "24px",
    padding: "20px",
  },
  songCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    aspectRatio: "2 / 3",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  songTitle: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
  },
  songAudio: {
    marginTop: "8px",
    width: "100%",
  },
};
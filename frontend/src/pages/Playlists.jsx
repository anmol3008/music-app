import { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";

function Playlists() {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅ Loading state
  const [error, setError] = useState(null);      // ✅ Error state

  useEffect(() => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch playlists");
        }
        return res.json();
      })
      .then((data) => {
        setPlaylists(data.items || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Something went wrong while loading your playlists.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken]);

  if (!accessToken) return <p>Please login first.</p>;
  if (loading) return <p>Loading your playlists...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Playlists</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

export default Playlists;

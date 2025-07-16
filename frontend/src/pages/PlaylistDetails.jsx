import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackList from "../components/TrackList";

function PlaylistDetails() {
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅
  const [error, setError] = useState(null);      // ✅

  useEffect(() => {
    if (!accessToken || !id) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to load playlist tracks");
        }
        return res.json();
      })
      .then(data => {
        setTracks(data.items || []);
      })
      .catch(err => {
        console.error("Track load error:", err);
        setError("Failed to load tracks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken, id]);

  if (!accessToken) return <p>Please login first.</p>;
  if (loading) return <p>Loading playlist tracks...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Playlist Tracks</h2>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default PlaylistDetails;

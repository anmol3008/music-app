import { useNavigate } from "react-router-dom";

function PlaylistCard({ playlist }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/playlists/${playlist.id}${window.location.search}`)}
      style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 8, padding: 16, width: 250 }}
    >
      <img src={playlist.images[0]?.url} alt={playlist.name} style={{ width: 220, borderRadius: 8 }} />
      <h3>{playlist.name}</h3>
      <p>{playlist.tracks.total} tracks</p>
    </div>
  );
}

export default PlaylistCard;

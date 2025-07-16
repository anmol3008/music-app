import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#222", padding: "1rem" }}>
      {/* Home Link */}
      <Link
        to="/"
        style={{ color: "#1DB954", fontWeight: "bold", marginRight: "2rem" }}
      >
        Home
      </Link>

      {/* Playlist Link */}
      <Link
        to="/playlists"
        style={{ color: "#fff", marginRight: "2rem" }}
      >
        Playlists
      </Link>

      {/* Login with Spotify Link */}
      <Link
        to="/login"
        style={{
          color: "#1DB954",
          backgroundColor: "#fff",
          padding: "0.4rem 1rem",
          borderRadius: "20px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Login with Spotify
      </Link>
    </nav>
  );
}

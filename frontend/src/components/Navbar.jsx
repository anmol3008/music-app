import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#222", padding: "1rem" }}>
      <Link to="/" style={{ color: "#1DB954", fontWeight: "bold", marginRight: "2rem" }}>
        Home
      </Link>
      <Link to="/playlists" style={{ color: "#fff" }}>
        Playlists
      </Link>
    </nav>
  );
}

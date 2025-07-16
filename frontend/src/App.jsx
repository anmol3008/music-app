import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Navbar from "./components/Navbar";
import SpotifyLogin from "./components/SpotifyLogin";    // ✅ ADD
import LoggedIn from "./pages/LoggedIn";                 // ✅ ADD

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:id" element={<PlaylistDetails />} />

        {/* ✅ NEW: Spotify OAuth Routes */}
        <Route path="/login" element={<SpotifyLogin />} />
        <Route path="/loggedin" element={<LoggedIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

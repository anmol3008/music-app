import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/");
    } else {
      alert("Failed to log in with Spotify");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default LoggedIn;

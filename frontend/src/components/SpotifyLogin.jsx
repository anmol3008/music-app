const SpotifyLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:5000/auth/spotify/login'; // backend redirect
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login with Spotify</h2>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyLogin;

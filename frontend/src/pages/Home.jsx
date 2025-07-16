export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Welcome to Your Spotify Clone! 🎶</h1>
      <p>
        Log in with your Spotify account to explore your playlists, discover tracks, and enjoy a personalized listening experience.
      </p>
      <p>
        Use the navigation menu above to get started.
      </p>
      <img
        src="https://developer.spotify.com/images/guidelines/design/icon3@2x.png"
        alt="Spotify Logo"
        width={120}
        style={{ marginTop: "2rem" }}
      />
    </div>
  );
}

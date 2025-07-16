export default function TrackList({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return <p>No tracks found in this playlist.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tracks.map((item) => (
        <li
          key={item.track.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #eee",
            paddingBottom: "1rem",
          }}
        >
          {item.track.album.images[2] && (
            <img
              src={item.track.album.images[2].url}
              alt={item.track.name}
              style={{ width: 50, height: 50, borderRadius: 6, marginRight: 20 }}
            />
          )}
          <div style={{ textAlign: "left" }}>
            <strong>{item.track.name}</strong>
            <br />
            <span>
              {item.track.artists.map((a) => a.name).join(", ")}
            </span>
            <br />
            <small>Album: {item.track.album.name}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}

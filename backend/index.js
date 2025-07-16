const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Step 1: Redirect to Spotify
app.get('/login', (req, res) => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private'
  ].join(' ');

  const params = querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.REDIRECT_URI,
    state: 'some-random-state'
  });

  res.redirect('https://accounts.spotify.com/authorize?' + params);
});

// Step 2: Spotify redirects back with code. Exchange it for tokens.
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).send('No code in callback');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token } = response.data;

    // For demo purposes: redirect to frontend with tokens
    res.redirect(`http://localhost:5173/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tokens', detail: err.message });
  }
});

// Simple test endpoint (optional)
app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

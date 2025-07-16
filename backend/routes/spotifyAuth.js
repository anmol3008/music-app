import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_HOME = 'http://localhost:5173';

// Login route — redirects to Spotify authorization
router.get('/login', (req, res) => {
  console.log(">>> Redirect URI used:", REDIRECT_URI);

  const scope = [
    'user-read-private',
    'user-read-email',
    'streaming',
    'user-read-playback-state',
    'user-modify-playback-state',
  ].join(' ');

  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
    show_dialog: true,
  });

  res.redirect('https://accounts.spotify.com/authorize?' + queryParams);
});

// Callback route — Spotify redirects here after login
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    const redirectParams = querystring.stringify({
      access_token,
      refresh_token,
    });

    // Redirect user to frontend React app with tokens in query params
    res.redirect(`${FRONTEND_HOME}/loggedin?` + redirectParams);
  } catch (error) {
    console.error('Spotify auth error:', error.response?.data || error.message);
    res.status(400).send('Failed to authenticate with Spotify');
  }
});

export default router;

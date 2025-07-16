const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Spotify API Setup ---
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Connection Error: ", err.message));

// --- ROUTES ---

// Route to start the login process
app.get('/login', (req, res) => {
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
  ];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// Callback route that Spotify redirects to
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      // Redirect back to the frontend with the token
      const frontendUrl = process.env.FRONTEND_URL;
      res.redirect(`${frontendUrl}?access_token=${access_token}`);
    })
    .catch(err => {
      console.error('Error getting Tokens:', err);
      res.send(`Error getting tokens: ${err}`);
    });
});


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

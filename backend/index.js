import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import spotifyAuth from './routes/spotifyAuth.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Mount Spotify auth routes under the /auth/spotify prefix
app.use('/auth/spotify', spotifyAuth);

// Connect to MongoDB (optional, if you are using it)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

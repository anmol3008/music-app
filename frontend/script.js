// SONG LIST (use your actual song file base names!)
const songs = [
  'song1', // Corresponds to 'music/song1.mp3'
  'song2',
  'song3'
];

let songIndex = 0;

// ELEMENT REFERENCES
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const nextBtn = document.getElementById('next');

// LOAD SONG FUNCTION
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// INITIAL LOAD
loadSong(songs[songIndex]);

// NEXT SONG FUNCTION
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  audio.play();
}

// BUTTON EVENT
nextBtn.addEventListener('click', nextSong);

// OPTIONAL: Play next automatically when song ends
audio.addEventListener('ended', nextSong);

import { reducerCases } from "./Constants.js";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "37i9dQZEVXbMDoHDwVN2tF", // A default playlist for testing
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    // We will add more cases here later as we build features
    default:
      return state;
  }
};

export default reducer;

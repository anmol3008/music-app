import React, { useEffect } from "react";
import { useStateProvider } from "./utils/StateProvider.jsx";
import { reducerCases } from "./utils/Constants.js";
import Login from "./components/Login.jsx";
import Spotify from "./components/Spotify.jsx";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      window.localStorage.setItem("token", accessToken);
      dispatch({ type: reducerCases.SET_TOKEN, token: accessToken });
      window.history.pushState({}, null, "/");
    } else {
      const storedToken = window.localStorage.getItem("token");
      if (storedToken && storedToken !== "undefined") {
        dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
      }
    }
  }, [dispatch]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}

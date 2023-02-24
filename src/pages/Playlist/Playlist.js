import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Playlist.css";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/search";

const Playlist = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      console.log("asd");
      console.log(token);
      console.log("asd");
    }
  }, []);

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            q: "hello",
            type: "artist"
        }
    })
}

  return (
    <>
      <button className="Playlistbutton" onClick={searchArtists}>Get Playlists</button>
    </>
  );
};

export default Playlist;
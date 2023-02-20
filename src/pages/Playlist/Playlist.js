import React, { useEffect, useState } from "react";
import "./Playlist.css";
import axios from "axios";

const END_POINT = "https://api.spotify.com/v1/me/playlists?limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ";

const Playlist = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
          setToken(localStorage.getItem("accessToken"));
        }

        axios
        .get(PLAYLISTS_ENDPOINT, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      }, []);

    return (
        <>
        <div className="Playlist">
            <button>Apply Filter</button>
            {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
        </div>
        </>

    );
};

export default Playlist;
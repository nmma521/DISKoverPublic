import React, { useEffect } from "react";
import "./WebApp.css"

const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp"
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
/*
http://localhost:3000/webapp#access_token=BQACufk8w8iQlZzgf0QUQxd8iErE8vkdHeSn5d4Ey7ajHggCK5ALQJTfDCmuJu4-3KWxUwtY5DhXqXA1QT1SIdWl_7KLELtJVjeO--BkNv_UD9DHcroSUu7w1SRilKpqNraJXfCubiQ6G-zwxbCVmvJbdWxQQf9nCIzeevJJzEhYL6cwcUl06PMnE_eQ1STbfiCUN10T5d1V10r7rQuwHRmjJEg&token_type=Bearer&expires_in=3600
*/
const getReturnParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1)
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
    }, {})

    return paramsSplitUp;
}

const WebApp = () => {
    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                expire_in,
                token_type,
            } = getReturnParamsFromSpotifyAuth(window.location.hash);

            console.log({ access_token });
            localStorage.clear();
            localStorage.setItem("accessToken", access_token)
            
        }
    })
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    return (
        <div className="container">
            <h1>hi</h1>
            <button onClick={handleLogin}>Login to spotify</button>
        </div>
    )
}

export default WebApp;
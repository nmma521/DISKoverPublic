import "./Playlist.css";
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack } from "@chakra-ui/react";
import { Global } from "@emotion/react";


export function Playlist () {

  const [trackList, setList] = useState([])


  const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
  const SECRET_ID = "980b6d0c977a40f4a77ccb4535d602b0"
  const REDIRECT_URI = "http://localhost:3000/callback"

  var SpotifyWebApi = require('spotify-web-api-node');
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: SECRET_ID,
    redirectUri: REDIRECT_URI
  })



    const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`

    const makePlaylist = async() => {

        var result = localStorage.getItem("accessToken")

        var topTracks
        console.log(result)
        spotifyApi.setAccessToken(result)

        spotifyApi.createPlaylist('fart the playlist', { 'description': 'farts', 'public': true })
        .then(function(data) {
          console.log('playlist made');
          }, function(err) {
          console.log('fart\n', err);
        })
    }
    function handlePlaylist(e) {
        makePlaylist(e)
        e.preventDefault();
    };


  return (
        <>
        <Box w="100%">
            <Center>
            <Button w="600px" onClick={handlePlaylist} id="categoryButton">Make Playlist</Button>
            </Center>

        </Box>
        </>
    );
};


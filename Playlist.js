import "./Playlist.css";
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack, Textarea, Text,
  Checkbox
 } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { TextareaAutosize } from "@material-ui/core";


export function Playlist () {

  const [trackList, setList] = useState([])
  const [playlistName, setName] = useState('')
  const [playlistDesc, setDesc] = useState('')
  const [playlistPriv, setPriv] = useState(true)


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
        if (playlistName !== "") {
          spotifyApi.createPlaylist(playlistName, { 'description': playlistDesc, 'public': playlistPriv })
          .then(function(data) {
            console.log('playlist made');
            }, function(err) {
            console.log('fart\n', err);
          })
        }
        else {
          alert("playlist name is empty!!")
        }


    }
    const handlePlaylistNameChange = (e) => {
      console.log(playlistName)
      let value = e.target.value;
      console.log(value)
      setName(value)
      console.log("name of playlist")
    }
    const handlePlaylistDescChange = (e) => {
      console.log(playlistDesc)
      let value = e.target.value;
      console.log(value)
      setDesc(value)
      console.log("desc of playlist")

    }
    const handlePlaylistPrivChange = (e) => {

      if (playlistPriv == true) {
        setPriv(false)
      }
      else {
        setPriv(true)
      }

      console.log("priv of playlist")
      console.log(playlistPriv)

    }
    function handlePlaylist(e) {
        makePlaylist(e)
        e.preventDefault();
    };


  return (
        <>
        <Box w="100%"
        >
            <Center>

            <VStack>
            <Text color={'white'}> Create a playlist here </Text>
            <Textarea name="PlaylistName" w="100%" variant="flushed" placeholder='Enter Name of your playlist' onChange={handlePlaylistNameChange}/>
            <Textarea name="PlaylistName" w="100%" variant="flushed" placeholder='Enter your playlist description' onChange={handlePlaylistDescChange}/>
            <Checkbox
            color={'white'}
            onChange={handlePlaylistPrivChange}> Private </Checkbox>

            <Button w="600px" onClick={handlePlaylist} id="categoryButton">Make Playlist</Button>
            </VStack>
            </Center>

        </Box>
        </>
    );
};


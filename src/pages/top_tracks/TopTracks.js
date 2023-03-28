
import Axios from "axios"
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack } from "@chakra-ui/react";
import { Global } from "@emotion/react";


export function TopTracks () {

  const [trackList, setList] = useState([])

  const CLIENT_ID = "b3c1e974291a42c991e8c0d41c4f261d"//"d9f307b6668446e78096051746b9ff21"
  const SECRET_ID = "b82534052d72482fa9746e9b31e87c8b"//"980b6d0c977a40f4a77ccb4535d602b0"
  const REDIRECT_URI = "http://localhost:3000/callback"

  var SpotifyWebApi = require('spotify-web-api-node');
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: SECRET_ID,
    redirectUri: REDIRECT_URI
  })



    const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`

    const getTopTracks = async () => {
        console.log("getting")
        
        console.log(localStorage.getItem('accessToken'))
        var list = fetch(TOP_TRACKS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        
        console.log(list)
    
        // console.log(list)
        console.log("done")
        console.log("farts")
        //return list;
    
    }

    var displayedList = []

    const getTheTopTracks = async() => {

        var result = localStorage.getItem("accessToken")
        //console.log(string)
        // var result = spotifyApi.getAccessToken()

        var topTracks
        console.log(result)
        spotifyApi.setAccessToken(result)

        spotifyApi.getMyTopTracks()
        .then(function(data) {

          topTracks = data.body.items

          var tracks = []

          topTracks.forEach(function(track, index) {
            var message_string = "" + (index + 1) + '. ' + track.name + ' by '
            var popularity = track.popularity

            for (var i = 0; i < track.artists.length; i++) {
              console.log(track.artists[i].name)
              if (i != track.artists.length - 1) {
                message_string += track.artists[i].name + ', '
              }
              else {
                message_string += track.artists[i].name
              }
            }
            console.log(message_string)
            tracks.push(
              <Box p="5px">
              <ListItem key='index'>

                {message_string}
                ; Popularity Statistic According to Spotify: {popularity}/100

              </ListItem>
              </Box>
            )


            setList(tracks)


          });
          console.log(trackList);
        }, function(err) {
          console.log('fart\n', err);
        })




      




    }
    function handleTopTracks(e) {
        getTheTopTracks(e)
        e.preventDefault();
    };


  return (
        <>
        TopTracks
        <Box w="100%">
            <Center>
            <Button w="600px" onClick={handleTopTracks} id="categoryButton">Get My Top Tracks</Button>

            </Center>

        </Box>
        <Box padding="5px" w="100%" width={"800px"}>
          <VStack maxH='230px'overflow="hidden" overflowY={'scroll'}>


          <List>

            {trackList}

          </List>
          </VStack>


        </Box>
        </>
    );
}

import Axios from "axios"
import { useState } from "react"
import React from "react"
import { Button, Box, List, Link, ListItem, Input,Center, VStack, StackDivider } from "@chakra-ui/react";
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

    var displayedList = []

    const getTheTopTracks = async() => {

        var result = localStorage.getItem("accessToken")
        //console.log(string)
        // var result = spotifyApi.getAccessToken()

        var topTracks
        console.log(result)
        spotifyApi.setAccessToken(result)

        spotifyApi.getMyTopTracks( { limit: 50 })
        .then(function(data) {

          topTracks = data.body.items
          console.log(topTracks)

          var tracks = []

          topTracks.forEach(function(track, index) {
            var track_name = "" + track.name
            var message_string = ' by '
            var link = "" + track.external_urls.spotify;
            console.log(track.uri)
            for (var i = 0; i < track.artists.length; i++) {
              console.log(track.artists[i].name)
              if (i != track.artists.length - 1) {
                message_string += track.artists[i].name + ', '
              }
              else {
                message_string += track.artists[i].name
              }
            }
            tracks.push(
              <Box p="5px">
              <ListItem key='index'>
              {index + 1}. {" "}
                <Link 
                color="#38A169"
                fontWeight='bold'
                href={link}
                isExternal='true'>
                  {track_name}


                </Link>
                {message_string}
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
        <VStack
        id="loginForm"
        divider={<StackDivider borderColor='gray.200' />}
              spacing="5px"
              align='stretch'
              color='black'
      >
        <VStack 
        height='374px'
        overflow="hidden"
         overflowY={'scroll'}>
        <List color={'black'}>

          {trackList}

        </List>
        </VStack>

        <Center>
        <Button w="300px"

         onClick={handleTopTracks} 
         id="trackButton"
          width="100%"
          style={{ marginTop: 15}}

         >Get My Top Tracks!
         </Button>
        </Center>

        </VStack>	
    );
}
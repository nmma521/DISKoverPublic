
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack } from "@chakra-ui/react";


export function TopTracksByArtist () {

  const [trackList, setList] = useState([])
  const [genreList, setGen] = useState([])

  const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
  const SECRET_ID = "980b6d0c977a40f4a77ccb4535d602b0"
  const REDIRECT_URI = "http://localhost:3000/callback"

  var SpotifyWebApi = require('spotify-web-api-node');
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: SECRET_ID,
    redirectUri: REDIRECT_URI
  })

    const getTheTopTracks = async() => {

        var result = localStorage.getItem("accessToken")
        //console.log(string)
        // var result = spotifyApi.getAccessToken()

        var topTracks
        console.log(result)
        spotifyApi.setAccessToken(result)

        spotifyApi.getMyTopArtists()
        .then(function(data) {
            console.log(data)
          topTracks = data.body.items

          var tracks = []
          var genre = []

          topTracks.forEach(function(track, index) {
            var name = track.name;
            var currGenre = track.genres;
            genre.push(
                <Box p="5px">
                <ListItem key='index'>
  
                  {currGenre}
                  
                </ListItem>
                </Box>
            );

            tracks.push(
              <Box p="5px">
              <ListItem key='index'>

                {name}
                
              </ListItem>
              </Box>
            )


            setList(tracks)
            setGen(genre)
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
            <Button w="600px" onClick={handleTopTracks} id="categoryButton">Get My Top Artists & Genres</Button>

            </Center>

        </Box>
        <Box padding="5px" w="100%" width={"800px"}>
          <VStack maxH='230px'overflow="hidden" overflowY={'scroll'}>


          <List>

            {trackList}

          </List>

            Genre:
          <List>
            {genreList.at(0)}
            {genreList.at(1)}
            {genreList.at(2)}
            {genreList.at(3)}
            {genreList.at(4)}
          </List>
          </VStack>


        </Box>
        </>
    );
}
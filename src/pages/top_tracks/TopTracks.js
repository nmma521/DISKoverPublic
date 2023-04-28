
import Axios from "axios"
import { useState } from "react"
import React from "react"
import { Button, Box, List, Link, ListItem, Image, Input,Center, VStack, StackDivider } from "@chakra-ui/react";
import { Global } from "@emotion/react";


export function TopTracks () {

  const [trackList, setList] = useState([])
  const [trackIdList, setId] = useState([])

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
          var trackIds = []

          topTracks.forEach(function(track, index) {
            var trackName = "" + track.name;
            var artistName = "";
            var duration = track.duration_ms * 0.00001667;
            var explicit = "" + track.explicit;
            var link = "" + track.external_urls.spotify;

            for (var i = 0; i < track.artists.length; i++) {
              if (i != track.artists.length - 1) {
                artistName += track.artists[i].name + ', ';
              }
              else {
                artistName += track.artists[i].name;
              }
            }

            trackIds.push(
              track.uri
            );
            setId(trackIds)

            if (track.preview_url != null) {
              tracks.push(
                //[trackName, artistName, duration, explicit, url]
                <Box>

                <ListItem>
                <video controls name="media">
                  <source src={track.preview_url} type="video/mp4"/>
                </video>
                </ListItem>

                <ListItem>
                <Image
                 src={track.album.images[0].url} 
                 width="35%" 
                 />
                </ListItem>

                <ListItem key='index'>
                  {index + 1}. Track Name: {" "} 
                  <Link 
                  color="#38A169"
                  fontWeight={'bold'}
                  href={link} 
                  isExternal="true">
                    {trackName}
  
                  </Link>
                </ListItem>
  
                <ListItem key='index'>
                  Artist(s): {" "} 
                  <Link 
                  color="#38A169"
                  fontWeight={'bold'}
                  href={track.artists[0].external_urls.spotify} 
                  isExternal="true">
                    {artistName}
  
                  </Link>
                </ListItem>

                <ListItem key='index'>
                  Album: {" "} 
                  <Link 
                  color="#38A169"
                  fontWeight={'bold'}
                  href={track.album.external_urls.spotify} 
                  isExternal="true">
                    {track.album.name}
                  </Link>
                </ListItem>

                <ListItem>
                  Release Date: {track.album.release_date}
                </ListItem>

                <ListItem key='index'>
                  Duration: {Math.round(duration * 100) / 100} minutes 
                </ListItem>
  
                <ListItem key='index'>
                  Explicit : {explicit}  
                </ListItem>
                </Box>
                );
              } else {
                tracks.push(
                  //[trackName, artistName, duration, explicit, url]
                  <Box p='5px'>
                  
                  <br></br>
                  <ListItem>
                      Preview is not available!
                    </ListItem>

                  <ListItem>
                <Image 
                src={track.album.images[0].url}
                 width="100"
                 >
                </Image>
                </ListItem>

                <ListItem key='index'>
                  Track Name: {" "} 
                  <Link 
                  color="#38A169"
                  fontWeight={'bold'}
                  href={link} 
                  isExternal="true">
                    {trackName}
  
                  </Link>
                </ListItem>
  
                <ListItem key='index'>
                  Artist(s): {" "} 
                  <Link 
                  color="#38A169"
                  fontWeight={'bold'}
                  href={track.artists[0].external_urls.spotify} 
                  isExternal="true">
                    {artistName}
  
                  </Link>
                </ListItem>

                <ListItem key='index'>
                  Album: {" "} 
                  <Link 
                  color="#38A169"
                  fontWeight={'bold'}
                  href={track.album.external_urls.spotify} 
                  isExternal="true">
                    {track.album.name}
                  </Link>
                </ListItem>

                <ListItem>
                  Release Date: {track.album.release_date}
                </ListItem>

                <ListItem key='index'>
                  Duration: {Math.round(duration * 100) / 100} minutes 
                </ListItem>
  
                <ListItem key='index'>
                  Explicit : {explicit}  
                </ListItem>
    
                  </Box>
                  );
              }
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
        height='369px'
        overflow="hidden"
         overflowY={'scroll'}
         sx={{marginRight:38}}
         >
        <List color={'black'}>

          {trackList}

        </List>
        </VStack>

        <Center>
        <Button w="300px"

         onClick={handleTopTracks} 
         id="trackButton"
          width="100%"
          fontSize='17px'
          style={{ marginTop: 2}}

         >Get My Top Tracks!
         </Button>
        </Center>

        </VStack>	
    );
}
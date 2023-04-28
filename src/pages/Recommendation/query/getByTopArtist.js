import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Link, Image, Input, Center, VStack, Container, StackDivider } from "@chakra-ui/react";
import imageBackground from "../../WebApp/backgroundImg";

export function GetByTopArtist () {

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

    const getByTopArtist = async() => {

        var result = localStorage.getItem("accessToken")
        //console.log(string)
        // var result = spotifyApi.getAccessToken()

        var topTracks
        var topArtists
        const seeds = [];
        console.log(result)
        spotifyApi.setAccessToken(result);

        /* Get a User’s Top Artists*/
        spotifyApi.getMyTopArtists()
        .then(function(data) {
        topArtists = data.body.items;
        console.log(topArtists);

        topArtists.forEach(function(track, index) {
          var artist = "" + track.id;
          seeds.push(artist);
        });

        
        // Get Recommendations Based on Seeds
        spotifyApi.getRecommendations({
          min_energy: 0.4,
          seed_artists: seeds.slice(0,5),
          min_popularity: 50,
          limit : 5 // num recommendation
          })
          .then(function(data) {
          //let recommendations = data.body;

          topTracks = data.body
          console.log(topTracks);
          var tracks = []

          
          topTracks.tracks.forEach(function(track, index) {
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

            if (track.preview_url != null) {
              tracks.push(
                //[trackName, artistName, duration, explicit, url]
                <Box p='5px'>

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
                 width="35%" 
                 />
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
          //console.log(recommendations);
          }, function(err) {
          console.log("Something went wrong!", err);
          });


        }, function(err) {
        console.log('Something went wrong!', err);
        });





    }


    function handleTopTracks(e) {
      setList([])
        getByTopArtist(e)
        e.preventDefault();
    };


  return (

        <VStack
        id="loginForm"
        divider={<StackDivider borderColor='gray.200' />}
        spacing="5px"
        align='stretch'
        color='black'>

        <VStack 
        height='326px'
        overflow="hidden"
          overflowY={'scroll'}>
          <List
          color={'black'}>
            {trackList}
          </List>
        </VStack>

        <Center>
        <Button 
  
        w="300px" 
        onClick={handleTopTracks}
        id="trackButton"
        width="100%"
        fontSize='17px'
        style={{ marginTop: 11}}>
            Get Recommendations
        </Button>
        </Center>
        </VStack>

    );
}
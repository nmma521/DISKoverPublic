import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Link, Input, Center, VStack, Container, StackDivider } from "@chakra-ui/react";
import imageBackground from "../../WebApp/backgroundImg";

export function GetByTopArtist () {

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

            tracks.push(
              //[trackName, artistName, duration, explicit, url]
              <Box p='5px'>
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
                Artist(s): {artistName} 
              </ListItem>

              <ListItem key='index'>
                Duration: {Math.round(duration * 100) / 100} minutes 
              </ListItem>

              <ListItem key='index'>
                Explicit : {explicit}  
              </ListItem>

              </Box>
              );
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
        height='339px'
        overflow="hidden"
          overflowY={'scroll'}>
          <List
          color={'black'}>
            {trackList}
          </List>
        </VStack>

        <Center>
        <Button w="300px" 
        onClick={handleTopTracks}
        id="trackButton"
        width="100%"
        style={{ marginTop: 15}}>
            Get Recommendations
        </Button>
        </Center>
        </VStack>

    );
}
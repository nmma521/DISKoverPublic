import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack, Container } from "@chakra-ui/react";
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
              <Box
              >
              <ListItem key='index'>
                Track Name: {trackName}  
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

              <a href={link} target="_blank">
                <Button
                  variant="contained"
                  className="py-1 px-2">
                    <i className="ri-upload-2-line pe-2"></i> link
                </Button>
              </a>

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
        <>

        <Box         
        w="100%"
        p="5px" 

        color={'white'}>
            <Center>




        
        <Box padding="1px" w="100%" width={"800px"}>
          <VStack maxH='800px'overflow="hidden" overflowY={'scroll'}>
          <Button w="600px" onClick={handleTopTracks} id="categoryButton">
            Get recommendation based on listening history
          </Button>
          <List>

            {trackList}

          </List>
          </VStack>
        </Box>
        </Center>
        </Box>

        </>
    );
}
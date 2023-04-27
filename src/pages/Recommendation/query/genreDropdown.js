import { Button, Box, List, ListItem, Input, Center, HStack, Link, VStack, Container, StackDivider } from "@chakra-ui/react";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import NavigationBar2 from "../../WebApp/components/NavigationBar/NavigationBar";

export function GenreDropdown() {
  const [selected, setSelected] = useState("None");
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


  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  const getByGenre = async() => {

    var result = localStorage.getItem("accessToken")
    //console.log(string)
    // var result = spotifyApi.getAccessToken()

    var topTracks
    var topArtists
    const seeds = [];
    console.log(result)
    spotifyApi.setAccessToken(result);

    // Get Recommendations Based on Seeds
        spotifyApi.getRecommendations({
            min_energy: 0.4,
            seed_genres: "" + selected,
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
                <Box p="5px">
                <ListItem key='index'>
                  Track Name: {" "}
                  <Link
                  href={link} 
                  isExternal='true'
                  fontWeight='bold'
                  color='#38A169'
                  >
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

}




  function handleClick(e) {
    //getByGenre(e)
    if(selected != "None") {
        getByGenre(e);
    }
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
        height='303px'
        overflow="hidden"
         overflowY={'scroll'}>
          <List>
            {trackList}
          </List>
    </VStack>

    <Center>
    <HStack spacing={19}>
    <FormControl 

    style={{ minWidth: 475 }}
    backgroundColor={'white'}>

      <InputLabel backgroundColor={'white'} 
      color={'white'}
      >Genre</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={"pop"}>POP</MenuItem>
        <MenuItem value={"happy"}>HAPPY</MenuItem>
        <MenuItem value={"hip-hop"}>HIP-HOP</MenuItem>
        <MenuItem value={"children"}>CHILDREN</MenuItem>
        <MenuItem value={"classical"}>CLASSICAL</MenuItem>
      </Select>
      <FormHelperText>select a genre</FormHelperText>
    </FormControl>

    <Button 
    onClick={handleClick}
    id="trackButton"
    width="475px"
    style={{ marginTop: 15}}> 

    Get Recommendations

    </Button>
    </HStack>
    </Center>
    </VStack>
  );
}


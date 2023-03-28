import { Button, Box, List, ListItem, Input, Center, VStack } from "@chakra-ui/react";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';

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

}




  function handleClick(e) {
    //getByGenre(e)
    if(selected != "None") {
        getByGenre(e);
    }
    e.preventDefault();
  };




  return (
    <div>
    <FormControl style={{ marginTop: 100, marginLeft: 0 }}>
      <InputLabel>Genre</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={"pop"}>POP</MenuItem>
        <MenuItem value={"happy"}>HAPPY</MenuItem>
        <MenuItem value={"hip-hop"}>HIP-HOP</MenuItem>
        <MenuItem value={"children"}>CHILDREN</MenuItem>
        <MenuItem value={"classical"}>CLASSICAL</MenuItem>
      </Select>
      <FormHelperText>select a genre</FormHelperText>
      <Button onClick={handleClick}> find music based on genre</Button>
    </FormControl>

    
    <>
        <Box padding="1px" w="100%" width={"800px"}>
          <VStack maxH='800px'overflow="hidden" overflowY={'scroll'}>
          <List>

            {trackList}

          </List>
          </VStack>


        </Box>
    </>
    </div>

  );
}


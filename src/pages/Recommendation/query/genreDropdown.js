import { Button, Box, List, ListItem, Image, Input, Center, HStack, Link, VStack, Container, StackDivider } from "@chakra-ui/react";
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

}




  function handleClick(e) {
    //getByGenre(e)
    setList([])
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
        height='287px'
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
      <MenuItem value={"anime"}>ANIME</MenuItem>
      <MenuItem value={"children"}>CHILDREN</MenuItem>
      <MenuItem value={"dance"}>DANCE</MenuItem>
      <MenuItem value={"dubstep"}>DUBSTEP</MenuItem>
      <MenuItem value={"happy"}>HAPPY</MenuItem>
      <MenuItem value={"hip-hop"}>HIP-HOP</MenuItem>
      <MenuItem value={"house"}>HOUSE</MenuItem>
      <MenuItem value={"indian"}>INDIAN</MenuItem>
      <MenuItem value={"indie"}>INDIE</MenuItem>
      <MenuItem value={"j-pop"}>JPOP</MenuItem>
      <MenuItem value={"latino"}>LATINO</MenuItem>
      <MenuItem value={"pop"}>POP</MenuItem>
      <MenuItem value={"punk"}>PUNK</MenuItem>
      <MenuItem value={"rock"}>ROCK</MenuItem>
      <MenuItem value={"r-n-b"}>RNB</MenuItem>
      <MenuItem value={"sleep"}>SLEEP</MenuItem>
      <MenuItem value={"soundtracks"}>SOUNDTRACK</MenuItem>
      </Select>
      <FormHelperText>select a genre</FormHelperText>
    </FormControl>

    <Button 
    onClick={handleClick}
    id="trackButton"
    width="475px"
    fontSize='17px'
    style={{ marginTop: 11}}> 

    Get Recommendations

    </Button>
    </HStack>
    </Center>
    </VStack>
  );
}


import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Link, Image, Input, StackDivider, Center, VStack } from "@chakra-ui/react";
export function GetByArtist () {

  const [trackList, setList] = useState([])
  const [input, setInput]=useState('');

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

        
        // Get Recommendations Based on Seeds
        var a = "artist:" + input
        spotifyApi.searchTracks(a)
          .then(function(data) {
          //let recommendations = data.body;

          topTracks = data.body
          console.log(topTracks);
          var tracks = []

          
          topTracks.tracks.items.forEach(function(track, index) {
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
                <video 
                controls name="media"
                >
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


    function handleTopTracks(e) {
        setList([]);
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
        height='324px'
        overflow="hidden"
        overflowY={'scroll'}>

          <List
          color={'black'}>
            {trackList}
          </List>

        </VStack>
        <Center>


        <VStack
        m="-35px"
        zIndex={'1'}
        >
        <Input 
        id="outlined-basic"
         label="Title" 
         variant="outlined" 
         width="975px"
         placeholder="Enter Artist Name"
        value={input}
         onChange={e=>setInput(e.target.value)} />

         <Button 
         variant="contained"
         color="primary" 
         onClick={handleTopTracks}
         id="trackButton"
         width="100%"
         fontSize='17px'
         

         >Get Recommendations From This Artist
         </Button>
         </VStack>

         </Center>

      </VStack>
    );
}

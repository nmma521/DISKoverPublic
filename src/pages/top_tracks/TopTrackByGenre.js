
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack, Modal,
   ModalOverlay, ModalContent, ModalHeader, useDisclosure, Textarea,
   ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Container,
  Text, StackDivider } from "@chakra-ui/react";


export function TopTracksByGenre () {

  const [artistList, setList] = useState([])
  const [genreList, setGen] = useState([])
  const [idList, setId] = useState([])
  const [artistTrackList, setTracks] = useState([]);
  const [finalList, setFinal] = useState([])
  const {isOpen, onOpen, onClose} = useDisclosure();
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
  const SECRET_ID = "980b6d0c977a40f4a77ccb4535d602b0"
  const REDIRECT_URI = "http://localhost:3000/callback"

  var SpotifyWebApi = require('spotify-web-api-node');
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: SECRET_ID,
    redirectUri: REDIRECT_URI
  })

  /**
   * Sorting function for dictionary
   */
  function sort_dictionary(dictionary) {
      // create array of key value pairs for genres
      var dictItems = Object.keys(dictionary).map(
        (key) => {
          return[key, dictionary[key]]
        }
      );

      //sort them by value/second element
      console.log("items")
      console.log(dictItems);

      dictItems.sort(
        (first, second) => {
          return second[1] - first[1]
        }
      );

      console.log("sorted items")
      console.log(dictItems);
      // get sorted keys in order

      var sorted_items = dictItems.map(
        (e) => {
          return e[0]
        }
      );
      console.log("here are genres\n");
      console.log(sorted_items);
      return sorted_items;
  }



    //get top genres

    const getTopGenres = async() => {

      var result = localStorage.getItem("accessToken")
      var topArtists
      spotifyApi.setAccessToken(result)

      spotifyApi.getMyTopArtists({limit : 50})
      .then(function(data) {


        topArtists = data.body.items  //fetch top artists

        var genre = []
        //dictionary form for genres
        var genreDict = {}

        topArtists.forEach(function(artist, index) {
          
          var currGenre = artist.genres;

          //set up the dictionary
          for (var i = 0; i < currGenre.length; i++) {

            var genre_string = "" + currGenre[i];

            if(!(genre_string in genreDict)) {
              genreDict[genre_string] = 1;
            }
            else {
              genreDict[genre_string]++;
            }
          }

        });
        var sortedGenres = sort_dictionary(genreDict);
        console.log(sortedGenres);


        for (var i = 0; i < 20; i++) {
          var message_string = "" + (i + 1) + ". " + sortedGenres[i];
          console.log(message_string)
          genre.push(
            <Box p="5px">
              <ListItem key='index'
              fontSize={'19px'}
              >
                {message_string}
              </ListItem>
            </Box>
          )
        }
        setGen(genre)

      }, function(err) {
        console.log('fart\n', err);
      })

    }

    function handleTopGenres(e) {
      getTopGenres(e)
      e.preventDefault();
  };



  return (
        <>
        <VStack
        id="loginForm"
        divider={<StackDivider borderColor='gray.200' />}
              spacing="5px"
              align='stretch'
              color='black'
      >
        <VStack height='369px'
        overflow="hidden" 
        overflowY={'scroll'}
        sx={{marginRight:38}}
        >
        <List color={'black'}>
        {genreList}
        </List>
        </VStack>
        <Center>
        <Button w="300px"
         onClick={handleTopGenres} 
         id="trackButton"
          width="100%"
          fontSize='17px'

          style={{ marginTop: 2}}>
            Get My Top Genres
        </Button>
        </Center>
        </VStack>




        </>
    );
}

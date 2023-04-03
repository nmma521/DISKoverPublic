
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Input, Center, VStack, Modal,
   ModalOverlay, ModalContent, ModalHeader, useDisclosure, Textarea,
   ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Container,
  Text } from "@chakra-ui/react";


export function TopTracksByArtist () {

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



    const getTopArtists = async() => {

        var result = localStorage.getItem("accessToken")
        //console.log(string)
        // var result = spotifyApi.getAccessToken()
        var topArtists
        spotifyApi.setAccessToken(result)

        spotifyApi.getMyTopArtists()
        .then(function(data) {
            console.log(data)
          topArtists = data.body.items
          console.log("artist data")
          console.log(topArtists)

          var artistNames = []
          var ids = []

          topArtists.forEach(function(artist, index) {
            //get name for message string
            var name = artist.name;
            var id = artist.id;
            var message_string = "" + (index + 1) + ". " + artist.name
            
            artistNames.push(
              <Box p='5px'>


              <ListItem key='index'>
                <Button
                w="600px"
                onClick={handleTopArtistTracks}
                id={artist.id}
                backgroundColor={'white'}
                opacity={'100%'}
                > 
                {message_string}
              </Button>
              </ListItem>
              </Box>
            )
            ids.push(id)
            setList(artistNames)

            setId(ids)
          });
          console.log('ids')
          console.log(idList)
//          console.log(artistList);

        }, function(err) {
          console.log('fart\n', err);
        })


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


        for (var i = 0; i < 5; i++) {
          var message_string = "" + (i + 1) + ". " + sortedGenres[i];
          console.log(message_string)
          genre.push(
            <Box p="5px">
              <ListItem key='index'>
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
    async function getTopArtistTracks(e) {

      e.preventDefault();
      console.log("button id")
      var id = e.target.id
      console.log(e.target.id);

      spotifyApi.getArtistTopTracks(id, 'US')
      .then(function(data) {
      //            console.log(data)
          console.log("tracks")
          var topArtistTracks = data.body.tracks
          console.log(topArtistTracks)

          var topArtistTracksList = []

          for (var i = 0; i < topArtistTracks.length; i++) {
            var message_string = "" + (i + 1) + ". " + topArtistTracks[i].name
            console.log(message_string)
            topArtistTracksList.push(
              <Box p="5px">
                <ListItem key='index'>
                  {message_string}
                </ListItem>
              </Box>
            )
          }
          setTracks(topArtistTracksList)
          console.log(topArtistTracksList)
          console.log("final track list")

          console.log(artistTrackList)

      }, function(err) {
        console.log('fart\n', err);
      })        
      console.log(artistTrackList)

    }
    function handleTopArtists(e) {
        getTopArtists(e)
        e.preventDefault();
    };

    function handleTopGenres(e) {
      getTopGenres(e)
      e.preventDefault();
  };
    function handleTopArtistTracks(e) {
      getTopArtistTracks(e)
      e.preventDefault()
      onOpen()
  };


  return (
        <>
        <Container>
        <Modal onClose={onClose}
        isOpen={isOpen} 
        isCentered
        size={'sm'}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>


            <Box backgroundColor={'black'}
            opacity={'80%'}
            m="2%"
            w='50%'
            h='60%'
            p={9}
            borderRadius="2%"
            borderColor='gray.200'
            alignContent={"center"}
            alignItems="center"
            overflow="hidden"
            overflowY={'scroll'}
            justifyContent="space-between"
            pos="fixed"
            top="100"
            color={'white'}
            
            >
              <VStack 
              m="50px 50px 0 50px" 
              alignContent={"center"}
              alignItems="center" 
              borderRadius="8px"
              borderColor={'black'}
              >
                <ModalHeader fontWeight={'bold'}> Artist's Top Tracks </ModalHeader>
                <List>
                  {artistTrackList}
                </List>

              <Button onClick={onClose}>Close</Button>
              </VStack>

            </Box>
            </Center>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>


        <Box w="100%" 
        color={'white'} 
        alignItems={'center'}>
          See Top Artists
            <Center>
            <Button
             w="600px" onClick={handleTopArtists} id="genreButton">Get My Top Artists
            </Button>
            </Center>
        </Box>

        <Box padding="5px" w="100%" width={"800px"}>
          <Center>
          <VStack maxH='230px'overflow="hidden" overflowY={'scroll'}>
          <List color={'white'}>
            {artistList}
          </List>
          </VStack>
          </Center>
        </Box>

        <Box w="100%" color={'white'}>
          See Top Genres
          <Center>
            <Button
             w="600px" onClick={handleTopGenres} id="genreButton">Get My Top Genres
            </Button>
            </Center>
        </Box>

        <Box padding="5px" w="100%" width={"800px"}>
          <Center>
          <VStack maxH='230px'overflow="hidden" overflowY={'scroll'}>
          <List color={'white'}>
            {genreList}
          </List>
          </VStack>
          </Center>
        </Box>
        </Container>


        </>
    );
}

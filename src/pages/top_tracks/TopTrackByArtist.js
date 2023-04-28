
import { useState } from "react"
import React from "react"
import { Button, Box, List, ListItem, Image, Input, Center, VStack, Modal,
   ModalOverlay, ModalContent, ModalHeader, useDisclosure, Textarea,
   ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Container,
  Text, StackDivider } from "@chakra-ui/react";


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
            var image = artist.images[0].url
            var message_string = "" + (index + 1) + ". " + artist.name
            
            artistNames.push(

              <Box
              p='5px'
              >
              <ListItem>
                <Image
                src={image}
                width={'20%'}
                
                />
              </ListItem>

              <ListItem key='index'>

                <Button
                h="40px"
                w="300px"
                onClick={handleTopArtistTracks}
                id={artist.id}
                backgroundColor={'white'}
                fontSize={'19px'}
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
              <Box p="8px">
                <ListItem
                key='index'
                >
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
    function handleTopArtistTracks(e) {
      getTopArtistTracks(e)
      e.preventDefault()
      onOpen()
  };


  return (
        <>
        <Modal onClose={onClose}
        isOpen={isOpen} 
        isCentered="true"
        size={'sm'}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>


            <Box backgroundColor={'black'}
            opacity={'100%'}
            m="3.5%"
            borderRadius="2%"
            w='50%'
            h='69%'
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
              m="40px 60px 0 50px" 
              borderRadius="8px"
              borderColor={'black'}
              >
                <ModalHeader 
                fontWeight={'bold'}
                fontSize={'19px'}
                as='u'
                > Artist's Top Tracks </ModalHeader>
                <List>
                  {artistTrackList}
                </List>

              <Button
              style={{ marginTop: 15}}
               onClick={onClose}>Close</Button>

              </VStack>

            </Box>
            </Center>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>


          <VStack
            id="loginForm"
            divider={<StackDivider borderColor='black' />}
            spacing="5px"
            align='stretch'
            color='black'
          >
          <VStack height='369px'
          overflow="hidden" 
          overflowY={'scroll'}
          divider={<StackDivider borderColor='gray.200' />}
          sx={{marginRight:38}}
          >

          
          <List color={'white'}>
            {artistList}
          </List>
          </VStack>

          <Center>
          <Button
            width="100%" 
            onClick={handleTopArtists} 
            id="artistButton"
            fontSize='17px'
            style={{ marginTop: 2}}>
              Get My Top Artists!
          </Button>
          </Center>
          </VStack>



        </>
    );
}

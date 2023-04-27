import React, { useEffect, useState } from "react";
import NavigationBar2 from "./components//NavigationBar/NavigationBar";
import "./WebApp.css"
import querystring from 'querystring-es3'
import { TopTracks } from "../top_tracks/TopTracks";
import { Button, Box, Container, Image, List, ListItem, Input, Center, VStack, Text, Heading,
Stack } from "@chakra-ui/react";
import imageBackground from "./backgroundImg";
import logo2 from "./img/logo2.png"
import spotifyplaybutton from "./img/spotifyplaybutton.gif"
import { Playlist } from "../Playlist/Playlist";
import { yieldExpression } from "@babel/types";
import { TopTracksByArtist } from "../top_tracks/TopTrackByArtist";
import NavigationBar from "../../components/NavigationBar";


//import querystring from 'querystring'
// import * as dotenv from 'dotenv';
// dotenv.config();

const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
const SECRET_ID = "980b6d0c977a40f4a77ccb4535d602b0"
const BASE64_ID = "ZDlmMzA3YjY2Njg0NDZlNzgwOTYwNTE3NDZiOWZmMjE6OTgwYjZkMGM5NzdhNDBmNGE3N2NjYjQ1MzVkNjAyYjA="
const REDIRECT_URL = "http://localhost:3000/webapp"
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const REFRESH_TOKEN = 'AQD-jz5C2JsIXVRIeYhyCe0-cA_a9tMvoXahA-0NQifGeBBucAyKWn9cAEiwQBWKVPHKR_cZ8owEPEm7PbgQelO6BV6cL6lzrFaauXshpySsuFnoWXsTCLhkxYXsITEQRJE'


const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"

const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp"

const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-top-read",
  "playlist-modify-public",
  "playlist-modify-private"
];

const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
/*
http://localhost:3000/webapp#access_token=BQACufk8w8iQlZzgf0QUQxd8iErE8vkdHeSn5d4Ey7ajHggCK5ALQJTfDCmuJu4-3KWxUwtY5DhXqXA1QT1SIdWl_7KLELtJVjeO--BkNv_UD9DHcroSUu7w1SRilKpqNraJXfCubiQ6G-zwxbCVmvJbdWxQQf9nCIzeevJJzEhYL6cwcUl06PMnE_eQ1STbfiCUN10T5d1V10r7rQuwHRmjJEg&token_type=Bearer&expires_in=3600
*/


function home(e) {
    window.location='/webapp'
  }
  



const getReturnParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1)
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
    }, {})

    return paramsSplitUp;
}

  

const WebApp = () => {
    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                expire_in,
                token_type,
            } = getReturnParamsFromSpotifyAuth(window.location.hash);

            console.log({ access_token });
            var image_var = localStorage.getItem("imageType");
            localStorage.clear();
            if (image_var == 0) {
                localStorage.setItem("imageType", 0);
            }
            else {
                localStorage.setItem("imageType", 1);
            }
            localStorage.setItem("accessToken", access_token)
            console.log("here is the token "+ {access_token});
            localStorage.setItem("tokenType", token_type)
            localStorage.setItem("expiresIn", expire_in)
            home();
            

        }
    })
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };


    const handleTimeout = () => {
        localStorage.setItem('accessToken', "1");
        console.log("test");
        console.log(localStorage.getItem('accessToken'))
        window.location.reload(false);
    }





    return (
        <Container maxW='100%'
        h='calc(100vh)' 
        backgroundRepeat="no-repeat"
        bgSize="100%"
        backgroundImage={imageBackground} 
        align="center">

        {localStorage.getItem('accessToken') != "1" ? (
            <>
            <NavigationBar/>
            <Center>
                <Box m="10% 0 0 0"
                bg="white"
                w="1000px"
                h="495px"
                p={12}
                borderWidth="10px"
                sx={{ borderRadius: "1.75%"}}
                >

                    <VStack 
                    opacity={'100%'}
                    m="2.5%"
                    borderRadius="2%"
                    spacing={9}
                    alignItems="center"
                    overflow="hidden"
                    overflowY={'scroll'}

                    color={'black'}>
                    <Image
                    src={logo2}
                    width="90%"
                    />
                    <Text></Text>
                    <Heading
                    >Welcome to DISKover!</Heading>

                    <Heading></Heading>

                    <Text
                    as="u"
                    fontWeight={'bold'}>Here's a guide to help you navigate the site {":)"} </Text>
                    <Text></Text>
                    <Text >
                        <li>
                            <Text
                            as='u'
                            fontWeight={'bold'}
                            color="green"
                            >View Top Tracks: 
                            </Text>
                            {" "} Get top tracks, artists, and genres
                            </li>
                    </Text>
                    <Text>
                        <li>
                            <Text
                            as='u'
                            fontWeight={'bold'}
                            color="green"
                            > 
                            Get Recommendations:
                            </Text>
                            
                            {" "}Get a series of randomized recommendations based on your listening history or a genre
                            </li>
                    </Text>
                    <Text>
                        <li>
                            <Text
                            as='u'
                            fontWeight={'bold'}
                            color="green"
                            > 
                            Make a Playlist: 
                            </Text>

                            {" "} Create a Spotify playlist using a description and name 
                            </li>
                    </Text>
                    <Text>
                        <li>
                            <Text
                            as='u'
                            fontWeight={'bold'}
                            color="green"
                            > 
                            Report Bug: 
                            </Text>

                            {" "} Send us a note if you encounter any bugs on the site 
                            
                        </li>
                    </Text>
                    <Text>
                        <li>
                        <Text
                            as='u'
                            fontWeight={'bold'}
                            color="green"
                            > 
                            Terms and Conditions:
                            </Text>
                            
                           {" "} Our terms for using this website 
                           </li>
                    </Text>
                    <Text>
                        <li>
                            <Text
                            as='u'
                            fontWeight={'bold'}
                            color="green"
                            > 
                            Contact Us:
                            </Text>
                            {" "} Send us a note if you have any questions or comments {":)"} 
                            </li>
                    </Text>
                    </VStack>
                    </Box>
                    
                <VStack>


                </VStack>

                </Center>


            <NavigationBar2/>
            

            </>
              ) : (
                <>
                     <Center>
  
                    <VStack>
                    <Box color={'white'}
                        h='calc(100vh)' 
                        width={"2000px"}
                        bgSize="100%"
                        align="center"
                        borderRadius='lg'
                        borderWidth="1 px"
                        backgroundColor="black"
                    >
                    <VStack
                    m="140px"
                    >
                    <Image
                    src={logo2}
                    width={'60%'}
                    />
                    <Text>
                        By Yiting An, Jefferson Chandra, Leo Lee, and Nathan Ma
                     </Text>
                     <Text>
                     </Text>
                     <Text>
                     </Text>
                     <Text>
                     </Text>
                    <Heading
                    size={'6xl'}
                    > Press Play </Heading>

                    <Image
                    src={spotifyplaybutton}
                    width={'10%'}
                     onClick={handleLogin}
                     />


                    </VStack>
                    </Box>

                    </VStack>
                    </Center>

                </>
              )}

        </Container>
    )
}

export default WebApp;

// const handleBackground = () => {
//     var type = localStorage.getItem('imageType');
//     if (type == 0) {
//         localStorage.setItem('imageType', 1);
//         console.log("new var " + localStorage.getItem('imageType'))
//         window.location.reload(true)
//     }
//     else {
//         localStorage.setItem('imageType', 0);
//         console.log("new var " + localStorage.getItem('imageType'))
//         window.location.reload(true)
//     }
// }

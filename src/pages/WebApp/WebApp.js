import React, { useEffect, useState } from "react";
import NavigationBar from "./components//NavigationBar/NavigationBar";
import "./WebApp.css"
import querystring from 'querystring-es3'
import { TopTracks } from "../top_tracks/TopTracks";
import { Button, Box, Container, List, ListItem, Input, Center, VStack } from "@chakra-ui/react";
import Axios from "axios";
import segg from './img/segg.jpg'
import goku from './img/goku.jpg'
import imageBackground from "./backgroundImg";
import { Playlist } from "../Playlist/Playlist";
import { yieldExpression } from "@babel/types";
import { TopTracksByArtist } from "../top_tracks/TopTrackByArtist";


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



const getAccessToken = async () => {
    
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${BASE64_ID}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
        body: querystring.stringify({
        grant_type: 'refresh_token',
        REFRESH_TOKEN,
       }),
    })
    var output = response.json()
    console.log({output})
    return output
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




    const handleBackground = () => {
        var type = localStorage.getItem('imageType');
        if (type == 0) {
            localStorage.setItem('imageType', 1);
            console.log("new var " + localStorage.getItem('imageType'))
            window.location.reload(true)
        }
        else {
            localStorage.setItem('imageType', 0);
            console.log("new var " + localStorage.getItem('imageType'))
            window.location.reload(true)
        }
    }

    return (
        <Container
        h='100%' 
        w='100%'
        backgroundImage={imageBackground}
        bgSize='100%'
        backgroundRepeat='no-repeat'
        align="center"
        overflowY={"scroll"}
>
        <div className="container">
        {localStorage.getItem('accessToken') != "1" ? (
            <>
            <Center>
                <VStack>

            <h1>logged in</h1>
                <Playlist/>
                <TopTracks/>
                <TopTracksByArtist/>
                <Button onClick={handleBackground}>dark mode</Button>
                <button onClick={handleTimeout}>out</button>
            </VStack>
            </Center>
            
            <NavigationBar/>
            

            </>
              ) : (
                <>
                <Center overflowY={'scroll'}>

                <VStack >

                <h1>hi</h1>
                <button onClick={handleLogin}>Login to spotify</button>
                </VStack>

                </Center>
                </>
              )}
        </div>
        </Container>
    )
}

export default WebApp;
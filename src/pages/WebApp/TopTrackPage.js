import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import NavigationBar2 from "./components/NavigationBar/NavigationBar";
import "./WebApp.css"
import { TopTracks } from "../top_tracks/TopTracks";
import { Button, Box, Container, List, ListItem, Input, Center, VStack,
     Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Axios from "axios";
import segg from './img/segg.jpg'
import goku from './img/goku.jpg'
import imageBackground from "./backgroundImg";
import { TopTracksByArtist } from "../top_tracks/TopTrackByArtist";  
import { TopTracksByGenre } from "../top_tracks/TopTrackByGenre";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const TopTrackPage = () => {

    return (
        <Container maxW='100%'
        h='calc(100vh)' 
        backgroundRepeat="no-repeat"
        bgSize="100%"
        backgroundImage={imageBackground} 
        align="center">
            <NavigationBar/>

            <Center>
                <Box m="10% 0 0 0"
                bg="white"
                w="1000px"
                h="495px"
                p={11}
                borderWidth="10px"
                sx={{ borderRadius: "1.75%"}}
                >
                    <Text
                    fontWeight='bold'>
                    Select a tab and click the button at the bottom to get your results!
                    </Text>
                    <Tabs 
                    variant="enclosed" >
                        <TabList mb="lem">
                            <Tab width="50%">Top Tracks</Tab>
                            <Tab width="50%">Top Artists</Tab>
                            <Tab width="50%">Top Genres</Tab>
                        </TabList>
                         <TabPanels>
                             <TabPanel>
                                <TopTracks />
                            </TabPanel>
                            <TabPanel>
                              <TopTracksByArtist />
                            </TabPanel>
                            <TabPanel>
                              <TopTracksByGenre />
                            </TabPanel>
                         </TabPanels>
                    </Tabs>
                </Box>

            </Center>

            
    <NavigationBar2/>
        </Container>
    )
}

export default TopTrackPage;
import React from "react";
import "./Recommendation.css"
import { GetByTopArtist } from "./query/getByTopArtist";
import { GenreDropdown } from "./query/genreDropdown";
import { Button, Box, Container, List, ListItem, Input, Center,
   VStack, Text, Tab, TabPanel, TabPanels, 
  TabList, Tabs } from "@chakra-ui/react";
import imageBackground from "../WebApp/backgroundImg";
import NavigationBar from "../../components/NavigationBar";
import NavigationBar2 from "../WebApp/components/NavigationBar/NavigationBar";
import { GetByArtist } from "./query/getByArtist";

const  Recommendation = () => {
  
    return (

      <Container maxW='100%'
      h='calc(100vh)' 
      backgroundRepeat="no-repeat"
      bgSize="100%"
      backgroundImage={imageBackground} 
      align="center"
      >
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
            fontWeight='bold'
            fontSize='21px'>
            Select a tab and click the button at the bottom to get your results!
            </Text>
            <Text
            fontWeight='bold'>
            *For Genre Select Recommendations, make sure to use the drop down menu 
            to select a genre first.
            </Text>

          <Tabs 
          variant="enclosed" >
              <TabList 
              mb="lem">
                  <Tab 
                  width="50%">Get Recommendations Based on Listening History </Tab>
                  <Tab width="50%">Get Recommendations Based on Genre Select </Tab>
                  <Tab width="50%">Get Recommendations Based on Artist </Tab>

              </TabList>
                <TabPanels>
                    <TabPanel>
                      <GetByTopArtist/>
                  </TabPanel>
                  <TabPanel>
                      <GenreDropdown/>
                  </TabPanel>
                  <TabPanel>
                      <GetByArtist/>
                  </TabPanel>
                </TabPanels>
          </Tabs>
      </Box>
      </Center>
      <NavigationBar2/>
      </Container>
      
    );
  };

export default Recommendation;

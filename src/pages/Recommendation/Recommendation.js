import React from "react";
import "./Recommendation.css"
import { GetByTopArtist } from "./query/getByTopArtist";
import { GenreDropdown } from "./query/genreDropdown";
import { Button, Box, Container, List, ListItem, Input, Center, VStack } from "@chakra-ui/react";
import imageBackground from "../WebApp/backgroundImg";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const  Recommendation = () => {

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
      h='cover' 
      w='cover'
      backgroundImage={imageBackground}
      backgroundPosition="center"
      bgSize='cover'
      backgroundRepeat='no-repeat'
      align="center"
      overflowY={"scroll"}
      >
        <Box         
        borderRadius='lg'
        borderWidth="1 px"
        backgroundColor="black"
        opacity={0.60}
        padding="10px" >
      <VStack 
      m="100px 5px 0 5px" 
      alignContent={"center"}
      alignItems="center" 
      borderRadius="8px">
      <>
      <Box 
      color={'white'}>
                    <h1>This is the recommendation page</h1>
                    <h1>Use this page to get song recommendations </h1>
                    <h1>either by genre or by artist. </h1>
                    <h1>The artist function will base it on your </h1>
                    <h1>listenin history and the genre buttons </h1>
                    <h1>will be based on your own input</h1>
      </Box>
      
      <GetByTopArtist/>
      <GenreDropdown/>
      </>
      <Button onClick={handleBackground}>dark mode</Button>
      </VStack>
      </Box>
      <NavigationBar/>
      </Container>
    );
  };

export default Recommendation;

import React, { useState } from "react";
import "./TNC.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import NavigationBar from "../../components/NavigationBar";
import NavigationBar2 from "../WebApp/components/NavigationBar/NavigationBar";
import {Box, Button, Center, Container, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import imageBackground from "../WebApp/backgroundImg";
import logo2 from "./logo2.png"

const TNC = () => {
  const auth = useAuth();
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

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
            <Center>
              <VStack
              m='67px'
              spacing={12}
              >

            <Heading color={'black'}
            fontWeight={'bold'}
            > Terms and Conditions
             </Heading>

             <Text>
             </Text>
             <Text>
            </Text>

             <Text
             spacing={3}>
              Thank you for using our app. This is an open and free use application. 
             </Text>
             <Text>
              Please acknowledge us if you choose to share or distribute this. Do not
             </Text>
             <Text>
              use this app to cause harm to Spotify or anyone else. Other than that, we
             </Text>
             <Text>
              hope you have fun and enjoy using DISKover!
             </Text>
             <Text>
              - Yiting, Jeff, Leo, Nathan
             </Text>

             <Text>
             </Text>
             <Text>
            </Text>
            <Text>
             </Text>

             <Image 

             src={logo2}
             width='36%'
             />



             </VStack>
        </Center>
        </Box>
        </Center>
    <NavigationBar2/>
    </Container>
  );
};

export default TNC;
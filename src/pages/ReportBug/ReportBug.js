import React, { useState } from "react";
import "./ReportBug.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { Playlist } from "../Playlist/Playlist";
import NavigationBar from "../../components/NavigationBar";
import NavigationBar2 from "../WebApp/components/NavigationBar/NavigationBar";
import {Box, Button, Center, Container, Heading, Text, VStack } from "@chakra-ui/react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import imageBackground from "../WebApp/backgroundImg";

const ReportBug = () => {
  const auth = useAuth();
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

  const handleSubmit = () => {

    db.collection("Report Bug").add({
      Classification: email,
      Message: input,
    });
    setEmail('');
    setInput('');
    
  };


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
              m='90px'
              >

            <Heading color={'black'}
            fontWeight={'bold'}
            > Send bugs to us here!
             </Heading>

          <FormControl 

           isRequired>

              <Input 
              w="550px" 
              placeholder="Bug Name" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              variant={'flushed'}
              />



            <Input 
            w="550px" 
             placeholder="Bug Description" 
             value={input} 
             variant={'flushed'}
             onChange={e=>setInput(e.target.value)}
            />
          </FormControl>


          <Button
          w="600px"
          id="emailButton"
           onClick={handleSubmit}
           >
            Send a message 
            </Button>


          </VStack>
        </Center>
        </Box>
        </Center>
    <NavigationBar2/>
    </Container>
  );
};

export default ReportBug;
import React from "react";
import { useState } from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { Button, Box, List, Heading, ListItem, Input, Image,
  Center, VStack, Textarea, Text, Flex, HStack, TextProp,
Container } from "@chakra-ui/react";
import * as ROUTES from '../../constants/routes'
import { useAuth } from "../../context/AuthContext";
import SettingPanel from "../SettingPanel/SettingPanel";
import logo2 from "../../pages/WebApp/img/logo2.png"
const NavigationBar = () => {



  function home(e) {
		e.preventDefault();
		window.location = '/webapp';
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

  const auth = useAuth();
    return (

        <Container
         className="NavigationBar"
         id="header">
            <VStack>
              
            <Image 
            w="200px"
            borderRadius='full'
            src={logo2}
            onClick={home}>

           </Image>

          <HStack
          as="nav"
          spacing="16">

                  <Link to={ROUTES.TOP_TRACKS}>
                  <li variant="nav"> 
                  View Top tracks 
                  </li>
                  </Link>
                  <Link to={ROUTES.RECOMMENDATION}>
                  <li>
                      Get Recommendations
                    </li>
                  </Link>
                  <Link className="button" to={ROUTES.PLAYLIST}>
                  <li variant="nav">
                    Make a Playlist
                    </li>
                  </Link>
                  <Link className="button" to={ROUTES.REPORT_BUG}>
                  <li variant="nav">
                    Report Bug
                    </li>
                  </Link>
                  <Link className="button" to={ROUTES.TNC}>
                  <li variant="nav">
                    Terms & Conditions
                  </li>
                  </Link>
                  <Link className="button" to={ROUTES.CONTACT_US}>
                  <li variant="nav">
                    Contact Us
                    </li>
                  </Link>
                  <li>

                  </li>
          </HStack>
          <Button 
          fontWeight='bold'
          width='300px'
          onClick={handleBackground}>
            Toggle 
            {localStorage.getItem('imageType') == 0 ? " Dark " : " Light "}
             Mode
            </Button>
          </VStack>

        </Container>
    );
  };

  export default NavigationBar
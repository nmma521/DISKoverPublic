import React from "react";
import "./NavigationBar.css";
import * as ROUTES from '../../../../constants/routes'
import { Link } from "react-router-dom";
import { Box, Button, Container } from '@chakra-ui/react'
import { useAuth } from "../../../../context/AuthContext";
import ViewCounter from "../../../../components/NavigationBar/ViewCounter"

const NavigationBar2 = () => {

  function home(e) {
    window.location='/webapp'
  }

  const handleTimeout = () => {
    localStorage.setItem('accessToken', "1");
    console.log(localStorage.getItem('accessToken'))
    window.location.reload(false);
    home();
}

    return (

        <Container 
        opacity={0.8}
        height="50px"
        width='100%'
        className="WebAppNavBar" >

          <Box
          height='10px'
          m='10px'
          >
          <ViewCounter/>
          </Box>
          <Link onClick={handleTimeout} to={ROUTES.WEB_APP}>

            Logout

            </Link>


        </Container>


    );
  };

  export default NavigationBar2
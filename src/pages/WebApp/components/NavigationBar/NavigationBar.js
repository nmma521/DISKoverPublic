import React from "react";
import "./NavigationBar.css";
import * as ROUTES from '../../../../constants/routes'
import { Link } from "react-router-dom";
import { Box, Container } from '@chakra-ui/react'
import { useAuth } from "../../../../context/AuthContext";
const NavigationBar = () => {

  const handleTimeout = () => {
    localStorage.setItem('accessToken', "1");
    console.log(localStorage.getItem('accessToken'))
    window.location.reload(false);
}

    return (
      <Container
      opacity={'0.5'}>
        <header className="WebAppNavBar" >



          <nav>
          <Link to={ROUTES.WEB_APP}>Home</Link>
          <br></br>
          <Link to={ROUTES.RECOMMENDATION}>Recommendation</Link>
          <br></br>
          <Link className="margin" to={ROUTES.PLAYLIST}>My Library</Link>
          <br></br>
          <Link onClick={handleTimeout} to={ROUTES.WEB_APP}>Logout</Link>
          </nav>

        </header>
        </Container>
    );
  };

  export default NavigationBar
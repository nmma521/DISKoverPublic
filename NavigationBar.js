import React from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes'
import { useAuth } from "../../context/AuthContext";
import SettingPanel from "../SettingPanel/SettingPanel";
import ViewCounter from "./ViewCounter";
const NavigationBar = () => {
  const auth = useAuth();
    return (
        <header className="NavigationBar" >
          <nav>
            <ul>
              <Link to={ROUTES.HOME}>
                <li>Home</li>
              </Link>
              {auth.user ? (
                <>
                  <Link to={ROUTES.WEB_APP}>
                    <li>Open web app</li>
                  </Link>
                  <li onClick={() => auth.signout()}>Sign Out</li>
                </>
              ) : (
                <>
                  <Link to={ROUTES.SIGN_UP}>
                    <li>Sign Up</li>
                  </Link>
                  <Link to={ROUTES.LOGIN}>
                    <li>Login</li>
                  </Link>{" "}
                </>
              )}
              
            </ul>
            <SettingPanel/>
            <ViewCounter />
          </nav>
        </header>
    );
  };

  export default NavigationBar
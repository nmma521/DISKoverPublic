import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import * as ROUTES from './constants/routes';

import './App.css';
import NavigationBar from './components/NavigationBar';
import Hero from './components/Hero';
import SignUpForm from "./components/SignUpForm/SignUpForm";
import PrivateRoute from "./components/PrivateRoute";
import WebApp from "./pages/WebApp/WebApp";
import LoginForm from "./components/LoginForm/LoginForm";
import ReportBug from "./pages/ReportBug/ReportBug";
import FAQ from "./pages/FAQ/FAQ";
import TNC from "./pages/TNC/TNC";
import { useAuth } from "./context/AuthContext";
import ContactUs from "./pages/ContactUs/ContactUs";
import Recommendation from "./pages/Recommendation/Recommendation";
import { TopTracks } from "./pages/top_tracks/TopTracks";
import TopTrackPage from "./pages/WebApp/TopTrackPage"
import { Playlist } from "./pages/Playlist/Playlist";

// import * as dotenv from 'dotenv';
// dotenv.config();

function App() {
  const {isLoading} = useAuth()
  return isLoading ? (
    <h1>Hold on, loading...</h1>
  ) : (
    <Router>

      <Switch>
        <Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
        <Route exact path={ROUTES.LOGIN} component={LoginForm} />
        <Route path={ROUTES.CONTACT_US}> <ContactUs/> </Route>
        <Route path={ROUTES.REPORT_BUG}> <ReportBug/> </Route>
        <Route path={ROUTES.PLAYLIST}> <Playlist/> </Route>
        <Route path={ROUTES.TNC}> <TNC/> </Route>
        <Route path={ROUTES.RECOMMENDATION}> <Recommendation/> </Route>
        <Route path={ROUTES.TOP_TRACKS}>
          <TopTrackPage/>
        </Route>
        {/* <Route path={ROUTES.PLAYLIST}> <Playlist/> </Route> */}
        <PrivateRoute path={ROUTES.WEB_APP}>
          <WebApp />
        </PrivateRoute>
        <Route 
        path={ROUTES.HOME}>
          <WebApp/>
        </Route>
      </Switch>
    </Router>
    
  );
};

export default App;

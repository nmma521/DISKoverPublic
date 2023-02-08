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
import WebApp from "./pages/WebApp";

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Switch>
        <Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
        <PrivateRoute>
          <WebApp />
        </PrivateRoute>
        <Route exact path={ROUTES.HOME} component={Hero}/>
      </Switch>
    </Router>
    
  );
};

export default App;

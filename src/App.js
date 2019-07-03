import React, { useState, useEffect } from 'react';
import './App.css';
import Slide from '@material-ui/core/Slide';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import SignIn from './components/SignIn';
import { withFirebase } from './components/FireBase';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import CoursesPage from './components/CoursesPage';

function App(props) {
  const [displaySignIn, toggleSignIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    console.log('lol');
    if (!authUser) {
      props.firebase.auth.onAuthStateChanged(user => {
        console.log(user);
        if (!authUser) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
    }
  });

  function toggleLogin() {
    toggleSignIn(!displaySignIn);
  }

  console.log(authUser);
  return (
    <div className="App">
      <Slide direction="right" in={displaySignIn} timeout={1000} style={{ position: 'absolute', zIndex: 2 }}>
        <div>
          <SignIn/>
        </div>
      </Slide>
      <Router>
        <Header toggleSignIn={toggleLogin} authUser={authUser}/>
        <Route exact path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.COURSES} component={CoursesPage}/>
      </Router>
    </div>
  );
}

export default withFirebase(App);

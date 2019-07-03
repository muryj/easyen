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
import { AuthUserContext } from './components/Session';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import CoursesPage from './components/CoursesPage';
import ProfilePage from './components/ProfilePage';

function App(props) {
  const [displaySignIn, toggleSignIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (!authUser) {
      props.firebase.auth.onAuthStateChanged(user => {
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

  return (
    <AuthUserContext.Provider value={authUser}>
      <div className="App">
        <Slide direction="right" in={displaySignIn} timeout={1000} style={{ position: 'absolute', zIndex: 2 }}>
          <div>
            <SignIn toggleSignIn={toggleLogin} displaySignIn={displaySignIn}/>
          </div>
        </Slide>
        <Router>
          <Header toggleSignIn={toggleLogin}/>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.COURSES} component={CoursesPage}/>
          <Route path={ROUTES.PROFILE} component={ProfilePage}/>
        </Router>
      </div>
    </AuthUserContext.Provider>
  );
}

export default withFirebase(App);

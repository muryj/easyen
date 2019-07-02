import React, { useState } from 'react';
import './App.css';
import Slide from '@material-ui/core/Slide';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import SignIn from './components/SignIn';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import CoursesPage from './components/CoursesPage';

function App() {
  const [displaySignIn, toggleSignIn] = useState(false);

  function toggleLogin() {
    toggleSignIn(!displaySignIn);
  }

  console.log(displaySignIn);
  return (
    <div className="App">
      <Slide direction="right" in={displaySignIn} timeout={1000} style={{ position: 'absolute', zIndex: 2 }}>
        <div>
          <SignIn/>
        </div>
      </Slide>
      <Router>
        <Header toggleSignIn={toggleLogin}/>
        <Route exact path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.COURSES} component={CoursesPage}/>
      </Router>
    </div>
  );
}

export default App;

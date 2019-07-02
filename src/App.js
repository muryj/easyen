import React, { useState } from 'react';
import './App.css';
import Slide from '@material-ui/core/Slide';
import SignIn from './components/SignIn';
import Header from './components/Header';

function App() {
  const [displaySignIn, toggleSignIn] = useState(false);

  function toggleLogin() {
    toggleSignIn(!displaySignIn);
  }

  return (
    <div className="App">
      <Slide direction="right" in={displaySignIn} timeout={1000} style={{ position: 'absolute', zIndex: 2 }}>
        <div>
          <SignIn/>
        </div>
      </Slide>
      <Header toggleSignIn={toggleLogin}/>
    </div>
  );
}

export default App;

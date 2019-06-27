import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import SignInSide from './components/signIn';


function App() {
  const [displaySignIn, toggleSignIn] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <SignInSide/>

      </header>
    </div>
  );
}

export default App;

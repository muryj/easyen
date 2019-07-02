import app from 'firebase/app';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'englishmaster-bd795.firebaseapp.com',
  databaseURL: 'https://englishmaster-bd795.firebaseio.com',
  projectId: 'englishmaster-bd795',
  storageBucket: 'englishmaster-bd795.appspot.com',
  messagingSenderId: '1023951777549',
  appId: '1:1023951777549:web:03982cd6d43381a4',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;

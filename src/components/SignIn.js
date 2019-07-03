import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import GoogleButton from 'react-google-button';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from './FireBase';
import CustomSnack from './SnackBar';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100vh',
    maxWidth: 500,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonsContainer: { marginBottom: 40, marginTop: 40 },
  signInContainer: { marginRight: 15 },
  signInButton: { height: 50 },
  signUpButton: { height: 50, marginBottom: 40, marginTop: 40 },
}));

const SignIn = (props) => {
  const styles = useStyles();
  const [auth, setAuth] = useState({ email: '', password: '' });
  const [authError, setError] = useState({ error: false, errorBody: {} });
  const [form, toggleForm] = useState({ signIn: true, signUp: false, forgotPass: false });

  const isInvalid =
    auth.email === '' ||
    auth.password === '';

  const clearInputs = () => {
    setAuth({ email: '', password: '', error: null });
  };

  const clearErrors = () => {
    setError({ error: false, errorBody: {} });
  };

  const handleForm = () => {
    toggleForm({ ...form, signIn: !form.signIn, signUp: !form.signUp });
    clearInputs();
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    clearErrors();
    const { target: { name, value } } = event;
    setAuth({ ...auth, [name]: value });
  };

  const handleInputFocus = (event) => {
    event.preventDefault();
    clearErrors();
    const { target: { name } } = event;
    setAuth({ ...auth, [name]: '' });
  };


  const handleSignUp = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(auth.email, auth.password)
      .then(authUser => {
        console.log(authUser);
        clearInputs();
      })
      .catch(error => {
        console.log(error);
        setError({ error: true, errorBody: error });
      });
    event.preventDefault();
  };

  const handleSignIn = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(auth.email, auth.password)
      .then((authUser) => {
        console.log(authUser);
        clearInputs();
      })
      .catch((error) => {
        console.log(error);
        setError({ error: true, errorBody: error });
      });
    event.preventDefault();
  };

  console.log(props, 'proooops');


  return (
    <div
      className={styles.paper}
    >
      {form.signIn ? <>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={styles.form} noValidate>
          <TextField
            error={authError.errorBody.code === 'auth/invalid-email'}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={auth.email}
          />
          <TextField
            error={authError.errorBody.code === 'auth/wrong-password'}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={auth.password}
          />

          <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
          <Grid container className={styles.buttonsContainer}>
            <Grid item xs className={styles.signInContainer}>
              <Button disabled={isInvalid} type="button" fullWidth variant="contained" color="primary"
                      className={styles.signInButton}
                      onClick={handleSignIn}>
                Sign In
              </Button>
            </Grid>
            <Grid item xs>
              <GoogleButton
                type="light"
                onClick={() => {
                  console.log('Google button clicked');
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Button>
                Forgot password?
              </Button>
            </Grid>
            <Grid>
              <Button onClick={handleForm}>
                {'Don\'t have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </> : null}
      {form.signUp ? <>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={styles.form} noValidate>
          <TextField
            error={authError.errorBody.code === 'auth/invalid-email'}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={auth.email}
          />
          <TextField
            error={authError.errorBody.code === 'auth/wrong-password'}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={auth.password}
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary"/>}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={handleSignUp}
            className={styles.signUpButton}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={handleForm}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </> : null}
      <Zoom in={authError.error} style={{ width: '80%', marginTop: 20 }}>
        <CustomSnack
          onClose={clearErrors}
          variant="error"
          message={authError.errorBody.message}
        />
      </Zoom>
    </div>
  );
};
export default withFirebase(SignIn);

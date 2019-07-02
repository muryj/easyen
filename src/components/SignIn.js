import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import GoogleButton from 'react-google-button';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../firebase';

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
}));

export default function SignIn() {
  const styles = useStyles();
  const [auth, setAuth] = useState({ email: '', password: '', error: false });
  const [form, toggleForm] = useState({ signIn: true, signUp: false, forgotPass: false });

  function handleForm() {
    toggleForm({ ...form, signIn: !form.signIn, signUp: !form.signUp });
  }

  function handleInputChange(event) {
    const { target: { name, value } } = event;
    setAuth({ ...auth, [name]: value });
  }

  function handleSignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(auth.email, auth.password)
      .then((user) => {
        console.log(user.uid);
      })
      .catch((error) => {
        setAuth(...auth, error);
        console.log(error);
      });
  }

  function handleSignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(auth.email, auth.password)
      .then((user) => {
        console.log(user.uid);
      })
      .catch((error) => {
        setAuth(...auth, error);
        console.log(error);
      });
  }

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
            value={auth.email}
          />
          <TextField
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
            value={auth.password}
          />

          <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
          <Grid container className={styles.buttonsContainer}>
            <Grid item xs className={styles.signInContainer}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={styles.signInButton}
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link href="#" variant="body2" onClick={handleForm}>
                {'Don\'t have an account? Sign Up'}
              </Link>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={() => handleSignUp()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleForm}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </> : null}
    </div>
  );
}

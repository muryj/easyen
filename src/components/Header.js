import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import * as ROUTES from '../constants/routes';


const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    maxHeight: '10vh',
    zIndex: 1,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function Header(props) {
  const styles = useStyles();
  return (
    <AppBar position="static" color="default" elevation={1} className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Link to={ROUTES.LANDING} variant="button" color="textPrimary" href="#" className={styles.toolbarTitle}>
          easyEN
        </Link>
        <nav>
          <Link to={ROUTES.COURSES} variant="button" color="textPrimary" href="#" className={styles.link}>
            Курсы
          </Link>
        </nav>
        <Button href="#" color="primary" variant="outlined" className={styles.link}
                onClick={() => props.toggleSignIn()}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

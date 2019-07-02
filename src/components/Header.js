import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    height: '10vh',
    zIndex:1
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
        <Typography variant="h6" color="inherit" noWrap className={styles.toolbarTitle}>
          Company name
        </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="#" className={styles.link}>
            Features
          </Link>
          <Link variant="button" color="textPrimary" href="#" className={styles.link}>
            Enterprise
          </Link>
          <Link variant="button" color="textPrimary" href="#" className={styles.link}>
            Support
          </Link>
        </nav>
        <Button href="#" color="primary" variant="outlined" className={styles.link} onClick={()=>props.toggleSignIn()}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

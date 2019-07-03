import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as ROUTES from '../constants/routes';
import { withFirebase } from './FireBase';

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

const Header = (props) => {
  const { firebase } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const styles = useStyles();
  return (
    <AppBar position="static" color="default" elevation={1} className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Link to={ROUTES.LANDING} variant="button" color="textPrimary" className={styles.toolbarTitle}>
          easyEN
        </Link>
        <nav>
          <Button color="primary" className={styles.link}
                  onClick={() => props.history.push(ROUTES.COURSES)}>
            Курсы
          </Button>
        </nav>
        {props.authUser ?
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => props.history.push(ROUTES.PROFILE)}>Мой профиль</MenuItem>
              <MenuItem onClick={handleClose}>Настройки</MenuItem>
              <MenuItem onClick={firebase.doSignOut}>Выйти</MenuItem>
            </Menu>
          </div> :
          <Button color="primary" variant="outlined" className={styles.link}
                  onClick={() => props.toggleSignIn()}>
            Login
          </Button>
        }

      </Toolbar>
    </AppBar>
  );
};
export default withRouter(withFirebase(Header));

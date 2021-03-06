import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
const styless = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10
  }
};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  // drawer: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
    // marginLeft: drawerWidth,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
  },
  menuButton: {
    // marginRight: 20,
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar, //pushes drawer down below toolbar
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    mobileOpen: false
  };

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  //for app bar drop down
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderTopContent() {
    // console.log('props in Header renderTopContent(): ', this.props.token);
    const open = Boolean(this.state.anchorEl);
    if (this.props.token.token) {
      return (
        <Fragment>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup='true'
            onClick={this.handleMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem component={Link} to='/profile'>
              Profile
            </MenuItem>
            <MenuItem component={Link} to='/signout'>
              Sign Out
            </MenuItem>
          </Menu>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            component={Link}
            to='/register'
          >
            Sign Up
          </Button>
        </Fragment>
      );
    }
  }

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    //   console.log('Header: auth prop: ', this.props.auth);
    // console.log('Header rendering...');
    console.log('Header props: ', this.props);
    // logout = () => {
    //   return (window.location.href = '/api/logout');
    // };

    const drawer = (
      <div>
        <Divider />
        <List>
          <Link style={{ textDecoration: 'none' }} to='/programs'>
            <ListItem button key='programs'>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary='Programs' />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link style={{ textDecoration: 'none' }} to='/profile'>
            <ListItem button key='profile'>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/signout'>
            <ListItem button key='profile'>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary='Sign Out' />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Hidden smUp implementation='css'>
              <IconButton
                className={classes.menuButton}
                color='inherit'
                aria-label='Menu'
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography
              className={classes.grow}
              variant='h6'
              color='inherit'
              noWrap
            >
              <Button
                className={classes.menuButton}
                color='inherit'
                size='large'
                component={Link}
                to='/'
              >
                Open Vista
              </Button>
            </Typography>
            {this.renderTopContent()}
          </Toolbar>
        </AppBar>

        {this.props.token.token && (
          <nav className={classes.drawer}>
            <Hidden smUp implementation='css'>
              <Drawer
                // container={this.props.container}
                variant='temporary'
                className={classes.drawer}
                // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                {drawer}
              </Drawer>
            </Hidden>

            <Hidden xsDown implementation='css'>
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant='permanent'
                open
              >
                <div className={classes.toolbar} />
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  console.log('hearder auth: ', state);
  return { token: state.auth.token };
};

// const mapStateToProps = ({ auth }) => {
//   // console.log('hearder auth: ', auth);
//   return { auth };
// };
export default withStyles(styles)(connect(mapStateToProps)(Header));

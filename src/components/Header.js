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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

const styless = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
  },
};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    // marginRight: 20,
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    mobileOpen: false,
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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderContent() {
    //console.log('props in Header renderContent(): ', this.props);
    const open = Boolean(this.state.anchorEl);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Fragment>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/register'
            >
              Sign Up
            </Button>
          </Fragment>
        );
      default:
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
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem
                component={Link}
                to='/profile'
                onClick={this.handleClose}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
          </Fragment>
        );
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  render() {
    const { classes, theme } = this.props;

    //   console.log('Header: auth prop: ', this.props.auth);
    // console.log('Header rendering...');
    // console.log('Header props: ', this.props);
    // logout = () => {
    //   return (window.location.href = '/api/logout');
    // };

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='Menu'
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

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
              >
                Open Vista
              </Button>
            </Typography>
            {this.renderContent()}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            <Drawer
              container={this.props.container}
              variant='temporary'
              // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
      // <div className={classes.root}>
      //   <AppBar position="static">
      //     <Toolbar>
      //       <IconButton
      //         className={classes.menuButton}
      //         color="inherit"
      //         aria-label="Menu">
      //         <MenuIcon />
      //       </IconButton>
      //       <Typography variant="h6" color="inherit" className={classes.grow}>
      //         News
      //       </Typography>
      //       <Button color="inherit">Login</Button>
      //     </Toolbar>
      //   </AppBar>
      // </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = ({ auth }) => {
  // console.log('hearder auth: ', auth);
  return { auth };
};

export default withStyles(styles)(connect(mapStateToProps)(Header));

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PrivateRoute from './PrivateRoute';
import MenuVertical from './MenuVertical';
import Header from './Header';
import MenuDrawer from './MenuDrawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProgramNew from './admin/ProgramNew';
import Pegasus from './Pegasus';

import { fetchProgramTypes } from '../actions';
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    // margin: '50px'
  },
  paper: {
    margin: 'auto',
    padding: 30,
  },
  content: {
    flexGrow: 1,
    background: 'white',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
  article: {
    margin: 'auto',
    maxWidth: 760,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.fetchProgramTypes();
  }

  render() {
    console.log('props: ', this.props);
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div>
          <Header />
          {/* <Grid container className={classes.root} spacing={16}> */}

          {/* <Route exact path='/programnew' component={ProgramNew} />
            <Route exact path='/2019pegasus' component={Pegasus} /> */}
          <main className={classes.content}>
            {/* <div className={classes.toolbar} /> */}
            <article className={classes.article}>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                hendrerit gravida rutrum quisque non tellus. Convallis convallis
                tellus id interdum velit laoreet id donec ultrices. Odio morbi
                quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod
                quis viverra nibh cras. Metus vulputate eu scelerisque felis
                imperdiet proin fermentum leo. Mauris commodo quis imperdiet
                massa tincidunt. Cras tincidunt lobortis feugiat vivamus at
                augue. At augue eget arcu dictum varius duis at consectetur
                lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </Typography>
              <Paper className={classes.paper}>
                <Route exact path='/programnew' component={ProgramNew} />
              </Paper>
            </article>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state in mSP: ', state);
  return { state };
};

// export default (connect(mapStateToProps)

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { fetchProgramTypes },
  )(App),
); //this makes all of the actions assigned to App as props so you can call them with this.props. fetchUser()

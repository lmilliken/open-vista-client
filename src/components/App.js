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
import ProgramNewRedux from './admin/ProgramNewRedux';
import Pegasus from './Pegasus';
import Test from './demos/Test';
import Formik from './demos/Formik';
import Formik2 from './demos/Formik2';
import Reservation from './demos/Reservation';
import Invitation from './demos/Invitation';
import AutoSelect from './demos/AutoSelect';
import Jared from './demos/Jared';
import SelectFormik from './admin/SelectFormik';

import { fetchProgramTypes, fetchUsers } from '../actions';
import SelectAutoFormik from './admin/SelectAutoFormik';
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
    this.props.fetchUsers();
  }

  render() {
    // console.log('props: ', this.props);
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
                <Route
                  exact
                  path='/programnewredux'
                  component={ProgramNewRedux}
                />
                <Route exact path='/test' component={Test} />
                <Route exact path='/formik' component={Formik} />
                <Route exact path='/formik2' component={Formik2} />
                <Route exact path='/reservation' component={Reservation} />
                <Route exact path='/invitation' component={Invitation} />
                <Route exact path='/autoselect' component={AutoSelect} />
                <Route exact path='/jared' component={Jared} />
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
    { fetchProgramTypes, fetchUsers },
  )(App),
); //this makes all of the actions assigned to App as props so you can call them with this.props. fetchUser()

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import PrivateRoute from './PrivateRoute';
import MenuVertical from './MenuVertical';
import Header from './Header';
import MenuDrawer from './MenuDrawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProgramNew from './admin/ProgramNew';
import Pegasus from './Pegasus';

import { fetchProgramTypes } from '../actions';
const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    // margin: '50px'
  },
  paper: {
    maxWidth: 900,
    margin: 'auto',
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
          <Grid container spacing={24}>
            <Grid item s={3} />
            <Grid item s={9}>
              draw goes here
            </Grid>
            <Route exact path='/programnew' component={ProgramNew} />
            <Route exact path='/2019pegasus' component={Pegasus} />
          </Grid>
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

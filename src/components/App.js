import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PrivateRoute from './PrivateRoute';
import Header from './Header';
import ProgramNew from './admin/ProgramNew';
import Pegasus from './Pegasus';

import { fetchProgramTypes } from '../actions';
const styles = theme => ({
  root: {
    // display: 'flex',
    // margin: '50px'
  },
});

class App extends Component {
  componentDidMount() {
    this.props.fetchProgramTypes();
  }

  render() {
    console.log('state: ', this.state);
    console.log('props: ', this.props);
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/programnew' component={ProgramNew} />
            <Route exact path='/2019pegasus' component={Pegasus} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// const mapStateToProps = ({ auth }) => {
//   return { auth };
// };

// export default (connect(mapStateToProps)

export default withStyles(styles)(
  connect(
    null,
    { fetchProgramTypes },
  )(App),
); //this makes all of the actions assigned to App as props so you can call them with this.props. fetchUser()

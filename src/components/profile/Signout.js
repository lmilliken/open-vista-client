import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signout(); //provided by redux store actions
  }

  render() {
    return <div>You are signed out</div>;
  }
}

const mapStateToProps = ({ signout }) => {
  return { signout };
};

export default connect(mapStateToProps, actions)(Signout);

import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class OAuth extends Component {
  componentDidMount() {
    // var query = queryString.parse(window.location.search);
    this.props.checkAuthToken();
  }

  render() {
    return <div></div>;
  }
}

export default connect(null, actions)(OAuth);

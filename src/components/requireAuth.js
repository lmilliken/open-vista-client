//Stephen: lower case title because by default we are exporting a function

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.token) {
        this.props.history.push('/login');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    console.log('here', state);
    return { token: state.auth.token };
  }
  return connect(mapStateToProps)(ComposedComponent);
};

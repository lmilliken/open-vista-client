import React, { Component } from 'react';
import requireAuth from '../requireAuth';

class Profile extends Component {
  render() {
    return <div>Profile</div>;
  }
}

export default requireAuth(Profile);

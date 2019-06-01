import React, { Component } from 'react';
const axios = require('axios');

export default class Home extends Component {
  myProfile = async () => {
    const response = await axios.get('/auth/current_user', {
      withCredentials: true
    });

    console.log('profile: ', response);
  };

  render() {
    return (
      <div>
        <p>Home</p>
        <button onClick={this.myProfile}>My profile</button>
      </div>
    );
  }
}

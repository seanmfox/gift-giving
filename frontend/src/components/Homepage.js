import React, { Component } from 'react';
import SignIn from './SignIn';

class Homepage extends Component {
  render() {
    return (
      <div>
        <SignIn setUser={(user) => this.props.setUser(user)}/>
      </div>
    );
  }
}

export default Homepage;

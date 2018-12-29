import React, { Component } from 'react';
import SignIn from './SignIn';

class Homepage extends Component {
	render() {
		return (
			<div className='homepage'>
				<div className='signin-container'>
					<h2 className='login-heading'>Log In</h2>
					<SignIn setUser={user => this.props.setUser(user)} />
				</div>
				<div className='gifts-image' />
			</div>
		);
	}
}

export default Homepage;

import React, { Component } from 'react';
import Button from './styles/Button';
import { signinUser } from '../lib/DBAPI';
import { connect } from 'react-redux';
import { updateUser } from '../actions/user';

class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};

	onTextChange = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	};

	onFormSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		this.userSignIn(email, password);
	};

	async userSignIn(email, password) {
		const userLogIn = await signinUser(email, password);
		if (userLogIn.success) {
			localStorage.JWT = userLogIn.token;
			this.props.updateUser(userLogIn);
		}
	}

	render() {
		const { email, password } = this.state;
		return (
			<form onSubmit={this.onFormSubmit}>
				<label>
					Email
					<input
						type='text'
						value={email}
						onChange={this.onTextChange}
						placeholder='email'
						name='email'
					/>
				</label>
				<label>
					Password
					<input
						type='password'
						value={password}
						onChange={this.onTextChange}
						placeholder='password'
						name='password'
					/>
				</label>
				<Button type='submit' signup>
					Sign In
				</Button>
			</form>
		);
	}
}

const mapStateToProps = reduxState => {
	return {
		user: reduxState.user
	};
};

export default connect(
	mapStateToProps,
	{ updateUser }
)(SignIn);

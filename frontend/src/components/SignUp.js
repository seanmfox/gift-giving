import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import UserForm from './UserForm';
import { createNewUser } from '../lib/DBAPI';

class SignUp extends Component {
	state = {
		fname: '',
		lname: '',
		password: '',
		verifyPassword: '',
		email: ''
	};

	onChangeText = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	};

	submitUser = e => {
		e.preventDefault();
		const { fname, lname, email, password, verifyPassword } = this.state;
		if(!fname || !lname || !email || !password) return;
		if (password !== verifyPassword) return;
		this.submitNewUser()
	};

	async submitNewUser() {
		const { fname, lname, email, password } = this.state;
		const res = await createNewUser(fname, lname, email, password);
		if (!res.success) {
			console.log(res.error);
		} else {
			this.setState({
				fname: '',
				lname: '',
				email: '',
				password: '',
				verifyPassword: ''
			});
			this.props.history.push("/");
		}
	}

	render() {
		const { fname, lname, password, verifyPassword, email } = this.state;
		return (
			<div className='signup-form-container'>
				<UserForm
					password={password}
					verifyPassword={verifyPassword}
					fname={fname}
					lname={lname}
					email={email}
					handleChangeText={this.onChangeText}
					submitUser={this.submitUser}
				/>
			</div>
		);
	}
}

export default withRouter(SignUp);

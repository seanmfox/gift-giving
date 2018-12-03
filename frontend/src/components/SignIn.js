import React, { Component } from 'react';
import Button from './styles/Button'

class SignIn extends Component {
	state = {
		email: '',
		password: ''
  };
  
  onTextChange = e => {
    const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
  }

  onFormSubmit = e => {
    e.preventDefault();
    console.log('Signed in!')
  }

	render() {
		const { email, password } = this.state;
		return (
			<div>
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
          <Button type='submit' signup>Sign In</Button>
				</form>
			</div>
		);
	}
}

export default SignIn;

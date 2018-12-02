import React from 'react';
import Button from './styles/Button'

const UserForm = props => (
	<div>
		<form className='user-signup-form' onSubmit={props.submitUser}>
			<label>First Name
				<input
					type='text'
					name='fname'
					placeholder='first name'
					value={props.fname}
					onChange={props.handleChangeText}
					required
				/>
			</label>
			<label>Last Name
				<input
					type='text'
					name='lname'
					placeholder='lname'
					value={props.lname}
					onChange={props.handleChangeText}
					required
				/>
			</label>
			<label>Email
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={props.email}
					onChange={props.handleChangeText}
					required
				/>
			</label>
			<label>Password
				<input
					type='password'
					name='password'
					placeholder='password'
					value={props.password}
					onChange={props.handleChangeText}
					required
				/>
			</label>
			<label>Verify Password
				<input
					type='password'
					name='verifyPassword'
					placeholder='verifyPassword'
					value={props.verifyPassword}
					onChange={props.handleChangeText}
					required
				/>
			</label>
      <Button type='submit' signup>Sign Up</Button>
		</form>
	</div>
);

export default UserForm;

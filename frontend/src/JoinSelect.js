import React from 'react';
import Button from './components/styles/Button';

const JoinSelect = props => (
	<form onSubmit={props.handleJoinSelectSubmit}>
		<label>
			Select your name from the list:
			<select
				onChange={props.handleChangeText}
				value={props.selectMember}
				name='selectMember'
				required
			>
				<option value='' />
				{props.retrievedMembers
					.filter(member => member.memberId === '')
					.map(member => (
						<option key={member.memberName} value={member.memberName}>
							{member.memberName}
						</option>
					))}
			</select>
		</label>
		<Button type='submit'>Submit</Button>
	</form>
);

export default JoinSelect;

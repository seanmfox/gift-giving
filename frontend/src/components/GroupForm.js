import React from 'react';
import Button from './styles/Button';

const GroupForm = props =>
	props.members.map((member, index) => {
		return (
			<fieldset key={index}>
				<label>
					Group Member
					<input
						type='text'
						value={member.memberName}
						name={index}
						onChange={props.handleMemberChangeText}
					/>
				</label>
        <Button name={index} onClick={props.handleMemberDelete}>Delete</Button>
			</fieldset>
		);
	});

export default GroupForm;

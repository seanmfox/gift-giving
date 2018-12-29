import React from 'react';

const MemberForm = props =>
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
						placeholder='Member name'
					/>
				</label>
        <button type='button' name={index} onClick={props.handleMemberDelete}>Delete</button>
			</fieldset>
		);
	});

export default MemberForm;

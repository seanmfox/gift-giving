import React from 'react';
import Button from './styles/Button';
import MemberForm from './MemberForm';

const GroupForm = props => (
	<form onSubmit={props.handleSubmitGroup}>
		<input
			type='text'
			name='gname'
			value={props.gname}
			onChange={props.handleChangeText}
			placeholder='Group Name'
		/>
		<Button type='button' onClick={props.handleAddInput}>
			Add Group Member
		</Button>
		<MemberForm
			members={props.members}
			handleMemberChangeText={props.handleMemberChangeText}
			handleMemberDelete={props.handleMemberDelete}
		/>
		<Button type='submit'>Submit</Button>
	</form>
);

export default GroupForm;

import React from 'react';
import Button from './styles/Button';
import MemberForm from './MemberForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GroupForm = props => (
	<form onSubmit={props.handleSubmitGroup}>
		<label>
			Group Name
			<input
				type='text'
				name='gname'
				value={props.gname}
				onChange={props.handleChangeText}
				placeholder='Group Name'
				className='group-name-input'
			/>
		</label>
		<Button className='add-member-button' type='button' onClick={props.handleAddInput}>
			{<FontAwesomeIcon icon='user-plus' />}
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

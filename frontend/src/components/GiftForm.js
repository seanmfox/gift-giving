import React from 'react';
import Button from './styles/Button';

const GiftForm = props => (
	<form onSubmit={props.handleGiftSubmit}>
		<label>
			Gift Name
			<input
				onChange={props.handleChangeText}
				type='text'
				value={props.giftName}
				placeholder='Gift Name'
				name='giftName'
				required
			/>
		</label>
		<label>
			Gift Cost
			<input
				onChange={props.handleChangeText}
				type='number'
				value={props.giftCost}
				placeholder='Gift Cost'
				name='giftCost'
				required
			/>
		</label>
		<label>
			Group
			<select
				name='groupId'
				value={props.groupId}
				onChange={props.handleChangeText}
				required
			>
				<option value='' />
				{props.groupList.map(group => (
					<option value={group._id} key={group.accessCode}>
						{group.gname}
					</option>
				))}
			</select>
		</label>
		<label>
			Gift Purchaser
			<select
				name='giftPurchaser'
				value={props.giftRecipient}
				onChange={props.handleChangeText}
				required
			>
				<option value='' />
				{props.groupId &&
					props.groupList
						.filter(group => group._id === props.groupId)[0]
						.members.map(member => (
							<option
								key={`${props.groupId}-${member.memberName}`}
								value={member.memberName}
							>
								{member.memberName}
							</option>
						))}
			</select>
		</label>
		<label>
			Gift Recipient
			<select
				name='giftRecipient'
				value={props.giftRecipient}
				onChange={props.handleChangeText}
				required
			>
				<option value='' />
				{props.groupId &&
					props.groupList
						.filter(group => group._id === props.groupId)[0]
						.members.map(member => (
							<option
								key={`${props.groupId}-${member.memberName}`}
								value={member.memberName}
							>
								{member.memberName}
							</option>
						))}
			</select>
		</label>
		<label>
			Gift Participants
			{props.groupId &&
				props.groupList
					.filter(group => group._id === props.groupId)[0]
					.members.map((member, index) => (
						<label key={`${props.groupId}-${member.memberName}`}>
							{member.memberName}
							<input
								type='checkbox'
								name='participants'
								onChange={props.handleCheckboxChange}
								value={index}
							/>
						</label>
					))}
		</label>
		<Button type='submit'>Add Gift</Button>
	</form>
);

export default GiftForm;

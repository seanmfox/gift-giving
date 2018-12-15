import React, { Component } from 'react';
import Button from './styles/Button';
import MemberForm from './MemberForm';
import { createNewGroup, createNewGift } from '../lib/DBAPI';
import Groups from './Groups';
import GiftForm from './GiftForm';

class Dashboard extends Component {
	state = {
		gname: '',
		members: [{ memberName: '' }],
		giftName: '',
		giftCost: '',
		groupId: '',
		giftPurchaser: '',
		participants: [],
		giftRecipient: ''
	};

	onChangeText = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
		if (e.target.name === 'groupId') return this.resetParticipants();
	};

	resetParticipants = () => {
		this.setState({ participants: [] })
	};

	onCheckboxChange = e => {
		const newState = { ...this.state };
		const memberList = this.props.user.groups.filter(group => group._id === newState.groupId)[0].members
		const checkedMembers =
			e.target.checked === true
				? newState[e.target.name].concat(memberList[e.target.value])
				: newState[e.target.name].filter(
						participant => participant.memberName !== memberList[e.target.value].memberName
				);
		this.setState({ participants: checkedMembers });
	};

	onMemberChangeText = e => {
		const newState = { ...this.state };
		newState.members[e.target.name].memberName = e.target.value;
		this.setState(newState);
	};

	addInput = () => {
		this.setState(prevState => ({
			members: prevState.members.concat([{ memberName: '' }])
		}));
	};

	removeInput = e => {
		e.persist();
		this.setState(prevState => ({
			members: prevState.members.filter((_, i) => i !== Number(e.target.name))
		}));
	};

	submitGroup = e => {
		e.preventDefault();
		const { gname, members } = this.state;
		if (!gname) return;
		this.createGroup(gname, members);
	};

	async createGroup(gname, members) {
		const { user } = this.props;
		const userName = `${user.fname} ${user.lname}`;
		const accessCode = this.createAccessCode();
		const group = await createNewGroup(
			gname,
			members,
			accessCode,
			userName,
			user.userId
		);
		if (!group.success) {
			console.log('Group not created');
		} else {
			this.setState({ gname: '', members: [{ memberName: '' }] });
			this.props.updateUserGroup(group);
		}
	}

	createAccessCode = () => {
		let code = '';
		for (let i = 0; i < 8; i++) {
			const min = Math.ceil(65);
			const max = Math.floor(90);
			code += String.fromCharCode(
				Math.floor(Math.random() * (max - min + 1)) + min
			);
		}
		return code;
	};

	submitGift = e => {
		e.preventDefault();
		const { giftName, giftCost, groupId, participants, giftRecipient, giftPurchaser } = this.state;
		const { user } = this.props
		this.createGift(giftName, giftCost, groupId, participants, giftRecipient, giftPurchaser, user.userId)
	};

	async createGift(...giftArgs) {
		const gift = await createNewGift(...giftArgs)
		if (!gift.success) {
			console.log('Gift not created')
		} else {
			this.props.updateUserGroup(gift)
		}
	}

	render() {
		const {
			gname,
			members,
			giftName,
			giftCost,
			groupId
		} = this.state;
		const { user } = this.props;

		return (
			<div>
				<h1>Dashboard</h1>
				<form onSubmit={this.submitGroup}>
					<input
						type='text'
						name='gname'
						value={gname}
						onChange={this.onChangeText}
						placeholder='Group Name'
					/>
					<Button type='button' onClick={this.addInput}>
						Add Group Member
					</Button>
					<MemberForm
						members={members}
						handleMemberChangeText={this.onMemberChangeText}
						handleMemberDelete={this.removeInput}
					/>
					<Button type='submit'>Submit</Button>
				</form>
				<GiftForm
					giftName={giftName}
					giftCost={giftCost}
					handleChangeText={this.onChangeText}
					handleGiftSubmit={this.submitGift}
					groupList={user.groups}
					groupId={groupId}
					handleCheckboxChange={this.onCheckboxChange}
					user={user}
				/>
				<p>Boolean - If no group code, set it or request one</p>
				<p>Show group matches</p>
				{user.groups.map(group => (
					<Groups group={group} key={group.accessCode} user={user} updateGiftList={(group) => this.props.updateUserGroup(group)} />
				))}
			</div>
		);
	}
}

export default Dashboard;

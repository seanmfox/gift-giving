import React, { Component } from 'react';
import { createNewGroup, createNewGift, retrieveGroup, assignGroupMember } from '../lib/DBAPI';
import Groups from './Groups';
import GiftForm from './GiftForm';
import GroupForm from './GroupForm';
import Join from './Join';

class Dashboard extends Component {
	state = {
		gname: '',
		members: [{ memberName: '' }],
		giftName: '',
		giftCost: '',
		groupId: '',
		giftPurchaser: '',
		participants: [],
		giftRecipient: '',
		accessCode: '',
		retrievedMembers: '',
		retrievedGroupId: '',
		selectMember: ''
	};

	onChangeText = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
		if (e.target.name === 'groupId') return this.resetParticipants();
	};

	resetParticipants = () => {
		this.setState({ participants: [] });
	};

	onCheckboxChange = e => {
		const newState = { ...this.state };
		const memberList = this.props.user.groups.filter(
			group => group._id === newState.groupId
		)[0].members;
		const checkedMembers =
			e.target.checked === true
				? newState[e.target.name].concat(memberList[e.target.value])
				: newState[e.target.name].filter(
						participant =>
							participant.memberName !== memberList[e.target.value].memberName
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
		const {
			giftName,
			giftCost,
			groupId,
			participants,
			giftRecipient,
			giftPurchaser
		} = this.state;
		const { user } = this.props;
		this.createGift(
			giftName,
			giftCost,
			groupId,
			participants,
			giftRecipient,
			giftPurchaser,
			user.userId
		);
	};

	async createGift(...giftArgs) {
		const gift = await createNewGift(...giftArgs);
		if (!gift.success) {
			console.log('Gift not created');
		} else {
			this.props.updateUserGroup(gift);
		}
	}

	joinSubmit = e => {
		e.preventDefault();
		const { accessCode } = this.state;
		const { user } = this.props;
		const groupIndex = user.groups
			.map(group => group.accessCode)
			.indexOf(accessCode);
		if (groupIndex >= 0) {
			console.log('You already belong to that group');
		} else {
			console.log('Join submitted!');
			this.findGroup(accessCode);
		}
	};

	async findGroup(code) {
		const group = await retrieveGroup(code);
		this.setState({ retrievedMembers: group.group.members, retrievedGroupId: group.group._id });
	}

	joinSelectSubmit = e => {
		e.preventDefault()
		const { selectMember, retrievedGroupId } = this.state
		if (!selectMember) return;
		this.assignMember(selectMember, retrievedGroupId)
	}

	async assignMember(selectMember, retrievedGroupId) {
		const res = await assignGroupMember(selectMember, retrievedGroupId)
		this.props.updateUserGroup(res)
	}

	render() {
		const {
			gname,
			members,
			giftName,
			giftCost,
			groupId,
			accessCode,
			retrievedMembers,
			selectMember
		} = this.state;
		const { user } = this.props;

		return (
			<div>
				<h1>Dashboard</h1>
				<h2>{`${user.fname} ${user.lname}`}</h2>
				<h2>Create a new group</h2>
				<GroupForm
					handleSubmitGroup={this.submitGroup}
					handleChangeText={this.onChangeText}
					gname={gname}
					members={members}
					handleAddInput={this.addInput}
					handleMemberChangeText={this.onMemberChangeText}
					handleMemberDelete={this.removeInput}
				/>
				<h2>Join a group</h2>
				<Join
					handleChangeText={this.onChangeText}
					accessCode={accessCode}
					handleJoinSubmit={this.joinSubmit}
					retrievedMembers={retrievedMembers}
					handleJoinSelectSubmit={this.joinSelectSubmit}
					selectMember={selectMember}
				/>
				<h2>Add a gift to a group</h2>
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
					<Groups
						group={group}
						key={group.accessCode}
						user={user}
						updateGiftList={group => this.props.updateUserGroup(group)}
					/>
				))}
			</div>
		);
	}
}

export default Dashboard;

import React, { Component } from 'react';
import Button from './styles/Button';
import GroupForm from './GroupForm';
import { createNewGroup } from '../lib/DBAPI';

class Dashboard extends Component {
	state = {
		gname: '',
		members: [{ memberName: '' }]
	};

	onChangeText = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
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
    const userName = `${user.fname} ${user.lname}`
    const accessCode = this.createAccessCode();
		const group = await createNewGroup(gname, members, accessCode, userName, user.userId);
		if (!group.success) {
			console.log('Group not created');
		} else {
			this.setState({ gname: '', members: [{ memberName: '' }] });
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

	render() {
		const { gname, members } = this.state;
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
					<Button onClick={this.addInput}>Add Group Member</Button>
					<GroupForm
						members={members}
						handleMemberChangeText={this.onMemberChangeText}
						handleMemberDelete={this.removeInput}
					/>
					<Button type='submit'>Submit</Button>
				</form>
				<p>Boolean - If no family code, set it or request one</p>
				<p>Show family matches</p>
			</div>
		);
	}
}

export default Dashboard;

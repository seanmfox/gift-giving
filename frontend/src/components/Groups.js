import React, { Component } from 'react';
import Gifts from './Gifts';
import Button from './styles/Button';
import { leaveGroup } from '../lib/DBAPI';

class Groups extends Component {
	handleGroupLeave = e => {
		this.onGroupLeave(e.target.value)
	}

	async onGroupLeave(groupId) {
		const res = await leaveGroup(groupId)
		this.props.updateUserGroup(res)
	}

	render() {
		const { group, user } = this.props;
		return (
			<div>
				<ul key={group.accessCode}>
					<li>{group.gname}<Button value={group._id} onClick={this.handleGroupLeave}>Leave Group</Button></li>
					<Gifts group={group} user={user} updateGiftList={(group) => this.props.updateUserGroup(group)}/>
				</ul>
			</div>
		);
	}
}

export default Groups;

import React, { Component } from 'react';
import Gifts from './Gifts';
import Button from './styles/Button';
import { leaveGroup } from '../lib/DBAPI';

class Groups extends Component {
	handleGroupLeave = e => {
		this.onGroupLeave(e.target.value);
	};

	async onGroupLeave(groupId) {
		const res = await leaveGroup(groupId);
		this.props.updateUserGroup(res);
	}

	handleClick = e => {
		e.target.firstElementChild.nextSibling.classList.toggle('closed');
	};

	render() {
		const { group, user } = this.props;
		return (
			<ul key={group.accessCode} onClick={this.handleClick}>
				{group.gname}
				<li>
					<Button value={group._id} onClick={this.handleGroupLeave}>
						Leave Group
					</Button>
				</li>
				<li className='closed'>
					<Gifts
						group={group}
						user={user}
						updateGiftList={group => this.props.updateUserGroup(group)}
					/>
				</li>
			</ul>
		);
	}
}

export default Groups;

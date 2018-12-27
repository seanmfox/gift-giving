import React, { Component } from 'react';
import Gifts from './Gifts';
import Button from './styles/Button';
import { leaveGroup } from '../lib/DBAPI';

class Groups extends Component {
	state = {
		showGifts: false
	};

	handleGroupLeave = e => {
		this.onGroupLeave(e.target.value);
	};

	async onGroupLeave(groupId) {
		const res = await leaveGroup(groupId);
		this.props.updateUserGroup(res);
	}

	handleClick = () => {
		this.setState(prevState => ({
			showGifts: (prevState.showGifts = !prevState.showGifts)
		}));
	};

	render() {
		const { showGifts } = this.state;
		const { group, user } = this.props;
		return (
			<li>
				<h3 onClick={this.handleClick}>
					{group.gname} - Access Code: {group.accessCode.toUpperCase()}
					<Button value={group._id} onClick={this.handleGroupLeave}>
						Leave Group
					</Button>
				</h3>
					{showGifts && (
						<Gifts
							group={group}
							user={user}
							updateGiftList={group => this.props.updateUserGroup(group)}
						/>
					)}
			</li>
		);
	}
}

export default Groups;

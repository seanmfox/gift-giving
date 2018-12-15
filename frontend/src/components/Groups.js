import React, { Component } from 'react';
import Gifts from './Gifts';

class Groups extends Component {
	render() {
		const { group, user } = this.props;
		return (
			<div>
				<ul key={group.accessCode}>
					<li>{group.gname}</li>
					<Gifts group={group} user={user} updateGiftList={(group) => this.props.updateGiftList(group)}/>
				</ul>
			</div>
		);
	}
}

export default Groups;

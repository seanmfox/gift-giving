import React, { Component } from 'react';
import JoinForm from './JoinForm';
import JoinSelect from '../JoinSelect';

class Join extends Component {
	render() {
		const { accessCode, retrievedMembers, selectMember } = this.props;
		return (
			<div>
				<JoinForm
					handleChangeText={this.props.handleChangeText}
					accessCode={accessCode}
					handleJoinSubmit={this.props.handleJoinSubmit}
				/>
				{retrievedMembers.length > 0 && (
					<JoinSelect
						retrievedMembers={retrievedMembers}
            handleJoinSelectSubmit={this.props.handleJoinSelectSubmit}
            handleChangeText={this.props.handleChangeText}
            selectMember={selectMember}
					/>
				)}
			</div>
		);
	}
}

export default Join;

import React, { Component } from 'react';
import GiftList from './GiftList';
import { connect } from 'react-redux';

class Gifts extends Component {
	memberIdArray = gift => {
		return gift.participants.map(participant => participant.memberId);
	};



	render() {
		const { group, user } = this.props;
		return (
			<ul>
				{group.gifts
					.filter(
						gift =>
							gift.giftRecipient !== `${user.fname} ${user.lname}` &&
							this.memberIdArray(gift).includes(`${user.userId}`)
					)
					.map(gift => (
						<GiftList
							key={gift._id}
							gift={gift}
							group={group}
						/>
					))}
			</ul>
		);
	}
}

const mapStateToProps = reduxState => {
	return {
		user: reduxState.user
	};
};

export default connect(
	mapStateToProps
)(Gifts);
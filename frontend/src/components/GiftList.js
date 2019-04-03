import React, { Component } from 'react';
import Button from './styles/Button';
import { deleteGift } from '../lib/DBAPI';
import { connect } from 'react-redux';
import { updateGroupGift } from '../actions/group';

class GiftList extends Component {
	state = {
		showGift: false
	};

	submitGiftDelete = (giftId, groupId) => {
		this.onGiftDelete(giftId, groupId);
	};

	async onGiftDelete(giftId, groupId) {
		const gift = await deleteGift(giftId, groupId);
		this.props.updateGroupGift(gift.group);
	}

	handleClick = () => {
		this.setState(prevState => ({
			showGift: (prevState.showGift = !prevState.showGift)
		}));
	};

	render() {
		const { showGift } = this.state;
		const { gift, group } = this.props;
		return (
			<li>
				<h4 onClick={this.handleClick}>
					{gift.giftName} for {gift.giftRecipient}
				</h4>
				{showGift && (
					<ul className='gift-list-details'>
						<li>Gift Cost: {gift.giftCost}</li>
						<li>Gift Purchaser: {gift.giftPurchaser}</li>
						<li>
							Participants:
							<ul>
								{gift.participants.map(participant => (
									<li key={`${gift.giftName}-${participant.memberName}`}>
										{participant.memberName}
									</li>
								))}
							</ul>
						</li>
						<li>
							<Button
								onClick={() => this.submitGiftDelete(gift._id, group._id)}
							>
								Delete
							</Button>
						</li>
					</ul>
				)}
			</li>
		);
	}
}

const mapStateToProps = reduxState => {
	return {
		user: reduxState.user,
		groups: reduxState.groups
	};
};

export default connect(
	mapStateToProps,
	{ updateGroupGift }
)(GiftList);

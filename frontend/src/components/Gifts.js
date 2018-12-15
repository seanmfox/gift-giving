import React, { Component } from 'react';
import GiftList from './GiftList';
import { deleteGift } from '../lib/DBAPI';
class Gifts extends Component {
	memberNameArray = gift => {
		return gift.participants.map(participant => participant.memberName);
	};

	submitGiftDelete = (giftId, groupId) => {
		this.onGiftDelete(giftId, groupId)
	}

	async onGiftDelete(giftId, groupId) {
		const gift = await deleteGift(giftId, groupId);
		this.props.updateGiftList(gift)
	}

	render() {
		const { group, user } = this.props;

		return (
			<div>
				{group.gifts
					.filter(
						gift =>
							gift.giftRecipient !== `${user.fname} ${user.lname}` &&
							this.memberNameArray(gift).includes(`${user.fname} ${user.lname}`)
					)
					.map(gift => (
						<GiftList
							key={gift._id}
							gift={gift}
							handleGiftDelete={giftId => this.submitGiftDelete(giftId, group._id)}
						/>
					))}
			</div>
		);
	}
}

export default Gifts;

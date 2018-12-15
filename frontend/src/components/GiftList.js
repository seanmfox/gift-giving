import React, { Component } from 'react';
import Button from './styles/Button';

class GiftList extends Component {
	giftDelete = (giftId) => {
		this.props.handleGiftDelete(giftId)
	}

	render() {
		const { gift } = this.props;
		return (
			<div>
				<ul>
					<li>Gift Name: {gift.giftName}</li>
					<li>GIft Cost: {gift.giftCost}</li>
					<li>Gift Recipient: {gift.giftRecipient}</li>
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
					<li><Button onClick={() => this.giftDelete(gift._id)}>Delete</Button></li>
				</ul>
			</div>
		);
	}
}

export default GiftList;

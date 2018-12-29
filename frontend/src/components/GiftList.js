import React, { Component } from 'react';
import Button from './styles/Button';

class GiftList extends Component {
	state = {
		showGift: false
	};
	giftDelete = giftId => {
		this.props.handleGiftDelete(giftId);
	};

	handleClick = () => {
		this.setState(prevState => ({
			showGift: (prevState.showGift = !prevState.showGift)
		}));
	};

	render() {
		const { showGift } = this.state
		const { gift } = this.props;
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
							<Button onClick={() => this.giftDelete(gift._id)}>Delete</Button>
						</li>
					</ul>
				)}
			</li>
		);
	}
}

export default GiftList;

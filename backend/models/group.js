const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
	giftName: String,
	giftCost: Number,
	giftPurchaser: String,
	giftRecipient: String,
	participants: [{}],
});

const GroupSchema = new Schema(
	{
		gname: String,
		accessCode: { type: String, sparse: true, lowercase: true },
		members: [{}],
		gifts: [GiftSchema]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Group', GroupSchema);

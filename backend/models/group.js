const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
	{
		gname: String,
		accessCode: { type: String, sparse: true, lowercase: true },
		members: [{}]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Group', GroupSchema);

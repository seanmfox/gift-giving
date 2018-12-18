const Group = require('../models').Group;
const User = require('../models').User;
const jwt = require('jsonwebtoken');

exports.createGroup = (req, res) => {
	const group = new Group();
	const { accessCode, userId, gname, members, userName } = req.body;
	const memberList = members
		.map(m => {
			return { memberName: m.memberName, memberId: '' };
		})
		.concat([{ memberName: userName, memberId: userId }]);
	group.members = memberList;
	group.accessCode = accessCode;
	group.gname = gname;
	group.save(err => {
		if (err) return res.json({ success: false, error: err });
		User.findById(userId, (err, user) => {
			user.groups.push(group._id);
			user.save(err => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, group });
			});
		});
	});
};

exports.retrieveGroup = (req, res) => {
	const { accessCode } = req.params;
	if (!accessCode)
		return res.json({
			success: false,
			error: 'An valid access code is needed '
		});
	Group.findOne({ accessCode }).exec((err, group) => {
		return res.json({ success: true, group });
	});
};

exports.createGift = (req, res) => {
	const { groupId } = req.params;
	const {
		giftName,
		giftCost,
		participants,
		giftRecipient,
		giftPurchaser,
		userId
	} = req.body;
	if (
		!giftName ||
		!giftCost ||
		participants.length < 1 ||
		!giftRecipient ||
		!giftPurchaser ||
		!userId
	) {
		return res.json({
			success: false,
			error: 'All fields must be completed'
		});
	}
	Group.findById(groupId).exec((err, group) => {
		group.gifts.push({
			giftName: giftName,
			giftCost: giftCost,
			giftPurchaser: giftPurchaser,
			giftRecipient: giftRecipient,
			participants: participants
		});
		group.save(err => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, group });
		});
	});
};

exports.deleteGift = (req, res) => {
	const { groupId, giftId } = req.params;
	if (!giftId) {
		return res.json({
			success: false,
			error: 'A gift ID must be provided.'
		});
	}
	Group.findById(groupId, (err, group) => {
		if (err) return res.json({ success: false, error: err });
		group.gifts.id(giftId).remove();
		group.save(error => {
			if (error) return res.json({ success: false, error: error });
			return res.json({ success: true, group });
		});
	});
};

exports.updateMembers = (req, res) => {
	const { selectedMember } = req.body;
	const { groupId } = req.params;
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		User.findById(decoded.userId, (err, user) => {
			user.groups.push(groupId);
			user.save(err => {
				Group.findById(groupId, (error, group) => {
					const groupIndex = group.members
						.map(member => member.memberName)
						.indexOf(selectedMember);
					group.members.splice(groupIndex, 1, {
						memberName: `${user.fname} ${user.lname}`,
						memberId: decoded.userId
					});
					group.save(err => {
						return res.json({ success: true, group });
					});
				});
			});
		});
	});
};

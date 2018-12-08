const Group = require('../models').Group;
const User = require('../models').User;

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
				return res.json({ success: true });
			});
		});
	});
};

exports.getGroup = (req, res) =>{
	
}